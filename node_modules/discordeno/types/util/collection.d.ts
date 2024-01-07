import { Bot } from "../bot.js";
export declare class Collection<K, V> extends Map<K, V> {
    maxSize: number | undefined;
    sweeper: CollectionSweeper<K, V> & {
        intervalId?: number;
    } | undefined;
    constructor(entries?: (readonly (readonly [K, V])[] | null) | Map<K, V>, options?: CollectionOptions<K, V>);
    startSweeper(options: CollectionSweeper<K, V>): number;
    stopSweeper(): void;
    changeSweeperInterval(newInterval: number): void;
    changeSweeperFilter(newFilter: (value: V, key: K, bot: Bot) => boolean): void;
    set(key: K, value: V): this;
    forceSet(key: K, value: V): this;
    array(): V[];
    /** Retrieve the value of the first element in this collection */
    first(): V | undefined;
    last(): V | undefined;
    random(): V | undefined;
    find(callback: (value: V, key: K) => boolean): NonNullable<V> | undefined;
    filter(callback: (value: V, key: K) => boolean): Collection<K, V>;
    map<T>(callback: (value: V, key: K) => T): T[];
    some(callback: (value: V, key: K) => boolean): boolean;
    every(callback: (value: V, key: K) => boolean): boolean;
    reduce<T>(callback: (accumulator: T, value: V, key: K) => T, initialValue?: T): T;
}
export interface CollectionOptions<K, V> {
    sweeper?: CollectionSweeper<K, V>;
    maxSize?: number;
}
export interface CollectionSweeper<K, V> {
    /** The filter to determine whether an element should be deleted or not */
    filter: (value: V, key: K, ...args: any[]) => boolean;
    /** The interval in which the sweeper should run */
    interval: number;
    /** The bot object itself */
    bot?: Bot;
}
