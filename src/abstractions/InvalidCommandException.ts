export class InvalidCommandException extends Error {
    
    public readonly errorCode: string;

    constructor(message: string) {
        super(message)
        this.errorCode = '\x1b[32mInvalidCommandException\x1b[0m'
    }

    
}