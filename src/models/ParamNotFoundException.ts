export class ParamNotFoundException extends Error {
    
    public readonly errorCode: string;

    constructor(message: string) {
        super(message)
        this.errorCode = '\x1b[32mParamNotFoundException\x1b[0m'
    }

    
}