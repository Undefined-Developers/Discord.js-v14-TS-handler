import { Prisma as PrismaTypes, PrismaClient } from '@prisma/client';

import { Config, config } from '../config/config';
import { ErryCacheManager } from './Cache';
import { Logger } from './Logger';

export class ErryDatabase extends PrismaClient {
    public config: Config
    public cache: prismaCacheMiddleware
    public logger: Logger
    constructor(botCache: ErryCacheManager, options?: PrismaTypes.PrismaClientOptions) {
        super(options)
        this.config = config
        this.cache = new prismaCacheMiddleware({
            useAllModels: true,
            defaultCacheActions: [ "findUnique", "findFirst", "findMany", "count", "aggregate", "groupBy", "findRaw", "aggregateRaw" ],
            cache: botCache
        })
        this.logger = new Logger({ prefix: "   Erry DB   ", ...this.config.logLevel });
        this.$use(this.cache.handle)
    }
    public async getPing(): Promise<string> {
        const start = performance.now();
        await this.$queryRaw`SELECT 1`;
        return (performance.now() - start).toFixed(2);
    }
    public async createGuildDatabase(guild_id: string): Promise<boolean> {
        this.logger.debug(`Creating database for guild ${guild_id}`)
        const key = {where: {guildId: guild_id}}

        const settingsDb = await this.settings.findUnique(key)
        if (!settingsDb || !settingsDb.language) {
            await this.settings.create({
                data: {
                    guildId: guild_id,
                    language: this.config.defaultLanguage
                }
            })
        }

        const es = await this.embed.findUnique(key)
        if (!es || !es.color) {
          await this.embed.create({
            data: {
              color: String(this.config.embed.color),
              wrongcolor: String(this.config.embed.wrongcolor),
              warncolor: String(this.config.embed.warncolor),
              footertext: String(this.config.embed.footertext),
              footericon: String(this.config.embed.footericon),
              guildId: guild_id
            }
          })
        }
        this.logger.debug(`Creating database finished for guild ${guild_id}`)
        return true;
    }
    public async removeGuildDatabase(guild_id: string): Promise<boolean> {
        this.logger.debug(`Removing database for guild ${guild_id}`)
        const key = {where: {guildId: guild_id}}

        await this.settings.delete(key)

        await this.embed.delete(key)

        this.logger.debug(`Removing database finished for guild ${guild_id}`)
        return true;
    }
}

export const defaultMutationMethods = [
    "create",
    "createMany",
    "update",
    "updateMany",
    "upsert",
    "delete",
    "deleteMany",
    "executeRawUnsafe",
];

class prismaCacheMiddleware {
    private defaultCacheActions: string[];
    private useAllModels: boolean;
    private toCache: {
        model: string,
        actions: string[],
        prefix?: string
    }[];
    private cache: ErryCacheManager;
    logger: Logger
    config: Config
    constructor(options: CacheOptions){
        this.toCache = options?.toCache ?? [];
        this.defaultCacheActions = options.defaultCacheActions ?? [];
        this.useAllModels = options.useAllModels ?? !options?.toCache?.length ? true : false;
        this.cache = options.cache
        this.config = config
        this.logger = new Logger({ prefix: "Erry DB Cache", ...this.config.logLevel });
    }
    
    public handle = async (params: MiddlewareParameters, next: (params: MiddlewareParameters) => Promise<any>) => { 
        let result: any = null;
        const instance = (this.useAllModels && this.defaultCacheActions.includes(params.action)) || this.toCache?.find?.(instance => instance.model === params.model && (this.defaultCacheActions.includes(params.action) || instance.actions.includes(params.action)))
        if(instance){
            const data = typeof instance === "object" ? instance : { model: params.model, prefix: "" };
            
            const cacheKey = `${data.prefix ? `${data.prefix}-`: ``}${params.model}:${params.action}:${JSON.stringify(params.args)}`;
            const findCache = await this.cache.DBget(cacheKey);
            
            if(findCache) {
                try {
                    result = JSON.parse(findCache);
                    this.logger.debug(`${params.model}.${params.action}() received data from Cache`);    
                } catch(e) {
                    console.error(e);
                }
            } else {
                result = await next(params);
                this.logger.debug("Found in db and now storing it in:", cacheKey)
                await this.cache.DBset(cacheKey, JSON.stringify(result, (_, v) => (typeof v === "bigint" ? v.toString() : v)))
            }
        } else this.logger.debug(`Could not find instance for ${params.model}`)
        
        if(!result) {
            result = await next(params);
        }
        if (defaultMutationMethods.includes(params.action)) {
            const keysData = Array.from(await this.cache.DBkeys()).filter(k => k.includes(`${params.model}:`));
            let keys: string[] = [];
            if(params.args.where) {
                const filtered = keysData.filter((k:string) => k.includes(JSON.stringify(params.args.where)) || k.includes("findMany"))
                keys = filtered.length ? filtered : keysData;
            }
            for(const key of keys) await this.cache.DBdelete(key); 
            this.logger.debug(`Invalidated ${keys.length} Keys after a mutationAction`)
        }
        return result;
    }
}

export interface CacheOptions {
    useAllModels: boolean;
    cache: ErryCacheManager
    defaultCacheActions?: string[];
    debug?: boolean;
    toCache?: {
        model: string,
        actions: string[],
        prefix?: string
    }[],
}
export type MiddlewareParameters = {
    model?: PrismaTypes.ModelName;
    action: PrismaTypes.PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
}