import { createClient } from 'redis';
import { PriorityQueue } from 'typescript-collections';

import { config, Config } from '../config/config';
import { Logger } from './Logger';

export class ErryCacheManager {
    private localCache: Map<string, { value: string, expiresAt: number, timeoutId: NodeJS.Timeout }> = new Map();
    private TTL = 60e3;
    private config: Config = config;
    private Client = createClient({ url: this.config.redis });
    private subClient = createClient({ url: this.config.redis }); // Separate client for subscribing
    private logger = new Logger({ prefix: "  Erry Cache ", ...this.config.logLevel });
    private cacheQueue: PriorityQueue<{ key: string, expiry: number }>;
    private invalidationTimeout: NodeJS.Timeout | null = null;

    constructor() {
        this.Client.on('error', (err) => this.logger.error(err));
        this.subClient.on('error', (err) => this.logger.error(err));
        this.cacheQueue = new PriorityQueue<{ key: string, expiry: number }>((a, b) => b.expiry - a.expiry);
    }

    public async init(): Promise<void> {
        await this.Client.connect();
        await this.subClient.connect();
        await this.subClient.subscribe('cache-updates', (message) => {
            const { action, key } = JSON.parse(message);
            if (action === 'delete') {
                this.invalidateLocalCache(key);
            }
        });
        this.logger.debug("✅ Cache ready")
    }

    private invalidateLocalCache(key: string) {
        const entry = this.localCache.get(key);
        if (entry) {
            this.logger.debug(`Invalidating ${key}`);
            clearTimeout(entry.timeoutId);
            this.localCache.delete(key);
        }
    }

    private scheduleNextInvalidation() {
        if (this.invalidationTimeout) {
            clearTimeout(this.invalidationTimeout);
        }

        const nextEntry = this.cacheQueue.peek();
        if (nextEntry) {
            const delay = nextEntry.expiry - Date.now();
            this.invalidationTimeout = setTimeout(() => {
                while (this.cacheQueue.size() > 0 && (this.cacheQueue.peek() as { key: string, expiry: number }).expiry <= Date.now()) {
                    const entry = this.cacheQueue.dequeue();
                    this.Client.del((entry as { key: string, expiry: number }).key).then(d => null);
                    this.logger.debug(`Invalidated cache key after TTL: ${(entry as { key: string, expiry: number }).key}`);
                }
                this.scheduleNextInvalidation();
            }, delay);
        }
    }

    private setLocalCache(key: string, value: string) {
        const timeoutId = setTimeout(() => {
            this.localCache.delete(key);
        }, this.TTL);
        this.localCache.set(key, { value, expiresAt: Date.now() + this.TTL, timeoutId });
        const expiry = Date.now() + this.TTL;
        this.cacheQueue.enqueue({ key, expiry });
        this.scheduleNextInvalidation();
    }

    async get(key: string): Promise<string | null> {
        const localEntry = this.localCache.get(key);
        if (localEntry && localEntry.expiresAt > Date.now()) {
            this.logger.debug(`Found entry ${key} in local cache, and returned it`);
            return localEntry.value;
        }

        const value = await this.Client.get(key);
        if (value !== null) {
            this.logger.debug(`Found entry ${key} in global cache, wrote to local, and returned it`);
            this.setLocalCache(key, value);
            return value;
        }

        this.logger.debug(`${key} wasn't found in cache, returning null`);
        return null;
    }

    async set(key: string, value: string): Promise<void> {
        this.logger.debug(`Setting entry ${key} in cache`);
        await this.Client.set(key, value, { EX: this.TTL / 1000 });
        await this.Client.publish('cache-updates', JSON.stringify({ action: 'set', key }));
        this.setLocalCache(key, value);
    }

    async delete(key: string): Promise<void> {
        this.logger.debug(`Deleting entry ${key} in cache`);
        await this.Client.del(key);
        await this.Client.publish('cache-updates', JSON.stringify({ action: 'delete', key })); // Use Client for publishing
        this.invalidateLocalCache(key);
    }

    async DBget(key: string): Promise<string | null> {
        key = `DB_${key}`;
        return this.get(key);
    }

    async DBset(key: string, value: string): Promise<void> {
        key = `DB_${key}`;
        await this.set(key, value);
    }

    async DBdelete(key: string): Promise<void> {
        key = `DB_${key}`;
        await this.delete(key);
    }

    async DBkeys(): Promise<string[]> {
        const keyFilter = `DB_*`;
        const keys: string[] = [];
        this.logger.debug(`Returning database keys in cache`);
        const keysIterator = this.Client.scanIterator({
            MATCH: keyFilter
        });
        for await (const key of keysIterator) keys.push(key);
        return keys;
    }
}