import * as dntShim from "../_dnt.shims.js";
export class Collection extends Map {
    constructor(entries, options) {
        super(entries ?? []);
        Object.defineProperty(this, "maxSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sweeper", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.maxSize = options?.maxSize;
        if (!options?.sweeper)
            return;
        this.startSweeper(options.sweeper);
    }
    startSweeper(options) {
        if (this.sweeper?.intervalId)
            clearInterval(this.sweeper.intervalId);
        this.sweeper = options;
        this.sweeper.intervalId = dntShim.setInterval(() => {
            this.forEach((value, key) => {
                if (!this.sweeper?.filter(value, key, options.bot))
                    return;
                this.delete(key);
                return key;
            });
        }, options.interval);
        return this.sweeper.intervalId;
    }
    stopSweeper() {
        return clearInterval(this.sweeper?.intervalId);
    }
    changeSweeperInterval(newInterval) {
        if (!this.sweeper)
            return;
        this.startSweeper({ filter: this.sweeper.filter, interval: newInterval });
    }
    changeSweeperFilter(newFilter) {
        if (!this.sweeper)
            return;
        this.startSweeper({ filter: newFilter, interval: this.sweeper.interval });
    }
    set(key, value) {
        // When this collection is maxSized make sure we can add first
        if ((this.maxSize || this.maxSize === 0) && this.size >= this.maxSize) {
            return this;
        }
        return super.set(key, value);
    }
    forceSet(key, value) {
        return super.set(key, value);
    }
    array() {
        return [...this.values()];
    }
    /** Retrieve the value of the first element in this collection */
    first() {
        return this.values().next().value;
    }
    last() {
        return [...this.values()][this.size - 1];
    }
    random() {
        const array = [...this.values()];
        return array[Math.floor(Math.random() * array.length)];
    }
    find(callback) {
        for (const key of this.keys()) {
            const value = this.get(key);
            if (callback(value, key))
                return value;
        }
        // If nothing matched
        return;
    }
    filter(callback) {
        const relevant = new Collection();
        this.forEach((value, key) => {
            if (callback(value, key))
                relevant.set(key, value);
        });
        return relevant;
    }
    map(callback) {
        const results = [];
        for (const key of this.keys()) {
            const value = this.get(key);
            results.push(callback(value, key));
        }
        return results;
    }
    some(callback) {
        for (const key of this.keys()) {
            const value = this.get(key);
            if (callback(value, key))
                return true;
        }
        return false;
    }
    every(callback) {
        for (const key of this.keys()) {
            const value = this.get(key);
            if (!callback(value, key))
                return false;
        }
        return true;
    }
    reduce(callback, initialValue) {
        let accumulator = initialValue;
        for (const key of this.keys()) {
            const value = this.get(key);
            accumulator = callback(accumulator, value, key);
        }
        return accumulator;
    }
}
