export type CacheEntry<T> = {
    createdAt: number,
    val: T,
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T): void {
    /** Add new object to cache */
        const newEntry = {
            createdAt: Date.now(),
            val: val,
        }
        this.#cache.set(key, newEntry);
    }

    get<T>(key: string): T | undefined {
    /** Retrieve cached object from cache */
        return this.#cache.get(key)?.val;
    }

    #reap(): void {
    /** 
    * Caching method to delete any entries that are older than the interval `this.#interval`.
    */
        const intervalReap = Date.now() - this.#interval;
        this.#cache.forEach((entry, key): void => {
            if (entry.createdAt < intervalReap) {
                this.#cache.delete(key);
            }
        });
    }

    #startReapLoop(): void {
    /* Initialise cache deletion loop */
        this.#reapIntervalId = setInterval((): void => {
            this.#reap();
        }, this.#interval);
    }

    stopReapLoop(): void {
    /* Stop cache deletion loop */
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}
