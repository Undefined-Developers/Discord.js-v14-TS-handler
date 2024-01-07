export function compress(buffer: any, level?: number): Uint8Array;
export function compress_raw(buffer: any, level?: number): Uint8Array;
export function decompress(buffer: any, limit?: number): Uint8Array;
export function decompress_raw(buffer: any, limit?: number): Uint8Array;
export function decompress_with(buffer: any, limit: number | undefined, transform: any): any;
export function decompress_raw_with(buffer: any, limit: number | undefined, transform: any): any;
