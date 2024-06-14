import { IFunction } from './models/IFunction';
import { InvalidCommandException } from './models/InvalidCommandException';
import { ArgumentNotFoundException } from './models/ArgumentNotFoundException';
import { ParamNotFoundException } from './models/ParamNotFoundException';

export class CLI {

    private functionStrategy?: IFunction;
    
    constructor(private readonly cliFunctions: Array<IFunction>) {
        const args = process.argv.slice(2);
        const [ functionName, functionParam ] = args;

        try {
            if(args.length == 0) {
                throw new ArgumentNotFoundException("No arguments were given. Type alix help for more info.");
            }
            
            const cliFunction = this.cliFunctions.find(cliFunction => cliFunction.name === functionName);

            if(!cliFunction) {
                throw new InvalidCommandException("Invalid command. Type alix help for more info.");
            }

            if(cliFunction.hasOwnProperty('param') && !functionParam) {
                throw new ParamNotFoundException("No command parameter was given. Type alix help for more info.");
            }

            cliFunction.setParam(functionParam);

            this.setFunction(cliFunction);
            
        } 
        catch (error: any) {
            console.error(error.errorCode, error.message);
            process.exit(0);
        }
    }

    public setFunction(cliFunction: IFunction): void {
        this.functionStrategy = cliFunction;
    }

    public async executeCLIFunction(): Promise<void>
    {
        try {
            const output = await this.functionStrategy!.executeAsync();
            console.log(output);
        }
        catch(error: any) {
            console.error(error.errorCode, error.message);
            process.exit(0);
        }
    }

}