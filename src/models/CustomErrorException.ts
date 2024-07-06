export class CustomErrorException extends Error {
    
    public readonly errorCode: string;

    constructor(errorCode: string, message: string) {
        super(message)
        this.errorCode = `\x1b[32m${errorCode}\x1b[0m`
    }

    
}