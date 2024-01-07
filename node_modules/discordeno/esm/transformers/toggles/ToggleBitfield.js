export class ToggleBitfield {
    constructor(bitfield) {
        Object.defineProperty(this, "bitfield", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        if (bitfield)
            this.bitfield = bitfield;
    }
    /** Tests whether or not this bitfield has the permission requested. */
    contains(bits) {
        return Boolean(this.bitfield & bits);
    }
    /** Adds some bits to the bitfield. */
    add(bits) {
        this.bitfield |= bits;
        return this;
    }
    /** Removes some bits from the bitfield. */
    remove(bits) {
        this.bitfield &= ~bits;
        return this;
    }
}
export class ToggleBitfieldBigint {
    constructor(bitfield) {
        Object.defineProperty(this, "bitfield", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0n
        });
        if (bitfield)
            this.bitfield = bitfield;
    }
    /** Tests whether or not this bitfield has the permission requested. */
    contains(bits) {
        return Boolean(this.bitfield & bits);
    }
    /** Adds some bits to the bitfield. */
    add(bits) {
        this.bitfield |= bits;
        return this;
    }
    /** Removes some bits from the bitfield. */
    remove(bits) {
        this.bitfield &= ~bits;
        return this;
    }
}
