export declare function verifySignature({ publicKey, signature, timestamp, body }: VerifySignatureOptions): {
    isValid: boolean;
    body: string;
};
export interface VerifySignatureOptions {
    publicKey: string;
    signature: string;
    timestamp: string;
    body: string;
}
