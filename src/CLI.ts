import { ICLIFunction } from './models/ICLIFunction';
import { InvalidFunctionException } from './models/InvalidFunctionException';
import { NoUserInputException } from './models/NoUserInputException';

export class CLI {

    private cliFunction?: ICLIFunction;
    
    constructor(private readonly cliFunctions: Array<ICLIFunction>) {
        const args = process.argv.slice(2);
        const [ functionName ] = args;

        try {
          
            if(args.length == 0) 
                throw new NoUserInputException("No arguments were given. Type alix help for more info.")
            
            const cliFunction = this.cliFunctions.find(cliFunction => cliFunction.name === functionName);

            if(!cliFunction) 
                throw new InvalidFunctionException("Invalid cli function. Type alix help for more info.");

            this.cliFunction = cliFunction;

            
        } 
        catch (error: any) {
            console.error(error.errorCode, error.message);
            process.exit(0);
        }
    }


    // TODO: Returns an array of args
    public parseArgs(): string[] {
        return []
    }

    public async executeCLIFunction(): Promise<void>
    {
        try {
            const output = await this.cliFunction!.executeAsync();
            console.log(output);
        }
        catch(error: any) {
            console.error(error.errorCode, error.message);
            process.exit(0);
        }
    }

}