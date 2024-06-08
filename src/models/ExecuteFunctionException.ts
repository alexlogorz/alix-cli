export class ExecuteFunctionException extends Error {
    
    public readonly errorCode: string;

    constructor(message: string) {
        super(message)
        this.errorCode = '\x1b[32mExecuteFunctionException\x1b[0m'
    }

    
}