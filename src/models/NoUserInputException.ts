export class NoUserInputException extends Error {
    
    public readonly errorCode: string;

    constructor(message: string) {
        super(message)
        this.errorCode = '\x1b[32mNoUserInputException\x1b[0m'
    }

    
}