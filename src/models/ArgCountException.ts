export class ArgCountException extends Error {
    
    public readonly errorCode: string;

    constructor(message: string) {
        super(message)
        this.errorCode = '\x1b[32mArgCountException\x1b[0m'
    }

    
}