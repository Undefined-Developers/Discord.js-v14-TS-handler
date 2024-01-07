export declare class ToggleBitfield {
    bitfield: number;
    constructor(bitfield?: number);
    /** Tests whether or not this bitfield has the permission requested. */
    contains(bits: number): boolean;
    /** Adds some bits to the bitfield. */
    add(bits: number): this;
    /** Removes some bits from the bitfield. */
    remove(bits: number): this;
}
export declare class ToggleBitfieldBigint {
    bitfield: bigint;
    constructor(bitfield?: bigint);
    /** Tests whether or not this bitfield has the permission requested. */
    contains(bits: bigint): boolean;
    /** Adds some bits to the bitfield. */
    add(bits: bigint): this;
    /** Removes some bits from the bitfield. */
    remove(bits: bigint): this;
}
