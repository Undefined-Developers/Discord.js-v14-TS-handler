import { PriorityQueue } from 'typescript-collections';

import { Prisma as PrismaTypes, PrismaClient } from '@prisma/client';

import { Config, config } from '../config/config';
import { Logger } from './Logger';

export class ErryDatabase extends PrismaClient {
    public config: Config
    public cache: prismaCacheMiddleware
    public logger: Logger
    constructor(options?: PrismaTypes.PrismaClientOptions) {
        super(options)
        this.config = config
        this.cache = new prismaCacheMiddleware({
            useAllModels: true,
            defaultCacheActions: [ "findUnique", "findFirst", "findMany", "count", "aggregate", "groupBy", "findRaw", "aggregateRaw" ]
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
    private defaultTTL: number;
    private useAllModels: boolean;
    private toCache: {
        model: string,
        actions: string[],
        ttl?: number,
        prefix?: string
    }[];
    private cache: Map<string, string>;
    private cacheQueue: PriorityQueue<{ key: string, expiry: number }>;
    logger: Logger
    config: Config
    constructor(options: CacheOptions){
        this.toCache = options?.toCache ?? [];
        this.defaultTTL = options?.defaultTTL ?? 300e3;
        this.defaultCacheActions = options.defaultCacheActions ?? [];
        this.useAllModels = options.useAllModels ?? !options?.toCache?.length ? true : false;
        this.cache = new Map()
        this.config = config
        this.logger = new Logger({ prefix: "Erry DB Cache", ...this.config.logLevel });
        this.cacheQueue = new PriorityQueue<{ key: string, expiry: number }>((a, b) => b.expiry - a.expiry);
    }
    
    public handle = async (params: MiddlewareParameters, next: (params: MiddlewareParameters) => Promise<any>) => { 
        let result: any = null;
        const instance = (this.useAllModels && this.defaultCacheActions.includes(params.action)) || this.toCache?.find?.(instance => instance.model === params.model && (this.defaultCacheActions.includes(params.action) || instance.actions.includes(params.action)))
        if(instance){
            const data = typeof instance === "object" ? instance : { model: params.model, ttl: this.defaultTTL, prefix: "" };
            
            if(!data.ttl && this.defaultTTL > 0) data.ttl = this.defaultTTL;
            
            const cacheKey = `${data.prefix ? `${data.prefix}-`: ``}${params.model}:${params.action}:${JSON.stringify(params.args)}`;
            const findCache = this.cache.get(cacheKey);
            
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
                this.cache.set(cacheKey, JSON.stringify(result, (_, v) => (typeof v === "bigint" ? v.toString() : v)))

                if(data.ttl) {
                    const expiry = Date.now() + data.ttl;
                    this.cacheQueue.enqueue({ key: cacheKey, expiry });
                    if (this.cacheQueue.size() === 1) {
                        this.scheduleNextInvalidation();
                    }
                }
            }
        } else this.logger.debug(`Could not find instance for ${params.model}`)
        
        if(!result) {
            result = await next(params);
        }
        if (defaultMutationMethods.includes(params.action)) {
            const keysData = Array.from(this.cache.keys()).filter(k => k.includes(`${params.model}:`));
            let keys: string[] = [];
            if(params.args.where) {
                const filtered = keysData.filter((k:string) => k.includes(JSON.stringify(params.args.where)) || k.includes("findMany"))
                keys = filtered.length ? filtered : keysData;
            }
            for(const key of keys) this.cache.delete(key); 
            this.logger.debug(`Invalidated ${keys.length} Keys after a mutationAction`)
        }
        return result;
    }

    private scheduleNextInvalidation() {
        const nextEntry = this.cacheQueue.peek();
        if (nextEntry) {
            const delay = nextEntry.expiry - Date.now();
            setTimeout(() => {
                while (this.cacheQueue.size() > 0 && (this.cacheQueue.peek() as {key: string;expiry: number;}).expiry <= Date.now()) {
                    const entry = this.cacheQueue.dequeue();
                    this.cache.delete((entry as {key: string;expiry: number;}).key);
                    this.logger.debug(`Invalidated cache key after TTL: ${(entry as {key: string;expiry: number;}).key}`)
                }
                if (this.cacheQueue.size() > 0) {
                    this.scheduleNextInvalidation();
                }
            }, delay);
        }
    }
}

export interface CacheOptions {
    useAllModels: boolean;
    defaultCacheActions?: string[];
    defaultTTL?: number;
    debug?: boolean;
    toCache?: {
        model: string,
        actions: string[],
        ttl?: number,
        prefix?: string
    }[]
}
export type MiddlewareParameters = {
    model?: PrismaTypes.ModelName;
    action: PrismaTypes.PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
}
