export class InvalidOptionException extends Error {
    
    public readonly errorCode: string;

    constructor(message: string) {
        super(message)
        this.errorCode = '\x1b[32mInvalidOptionException\x1b[0m'
    }

    
}