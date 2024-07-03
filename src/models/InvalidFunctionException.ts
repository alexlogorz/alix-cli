export class InvalidFunctionException extends Error {
    
    public readonly errorCode: string;

    constructor(message: string) {
        super(message)
        this.errorCode = '\x1b[32mInvalidFunctionException\x1b[0m'
    }

    
}