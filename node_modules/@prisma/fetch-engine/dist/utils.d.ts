import { Platform } from '@prisma/get-platform';
export declare function getRootCacheDir(): Promise<string | null>;
export declare function getCacheDir(channel: string, version: string, platform: string): Promise<string | null>;
export declare function getDownloadUrl({ channel, version, platform, binaryName, extension, }: {
    channel: string;
    version: string;
    platform: Platform;
    binaryName: string;
    extension?: string;
}): string;
export declare function overwriteFile(sourcePath: string, targetPath: string): Promise<void>;
