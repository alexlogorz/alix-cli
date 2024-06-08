export class ArgumentNotFoundException extends Error {
    
    public readonly errorCode: string;

    constructor(message: string) {
        super(message)
        this.errorCode = '\x1b[32mArgumentNotFoundException\x1b[0m'
    }

    
}