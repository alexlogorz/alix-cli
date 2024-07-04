import { ICLIFunction } from './models/ICLIFunction';
import { InvalidFunctionException } from './models/InvalidFunctionException';
import { ArgCountException } from './models/ArgCountException';
import { IParsedArgs } from './models/IParsedArgs'

export class CLI {

    private functionToExecute: ICLIFunction | undefined;
    
    constructor(private readonly validCliFunctions: Array<ICLIFunction>) {
        const args = process.argv.slice(2);
        const parsedArgs: IParsedArgs = this.parseArgs(args)
        const { userOptions, functionName, functionParam } = parsedArgs
        
        const cliFunction = this.validCliFunctions.find(cliFunction => cliFunction.name === functionName);

        try {
            this.setFunctionToExecute(userOptions, functionParam, cliFunction)
        } 
        catch (error: any) {
            console.error(error.errorCode, error.message);
            process.exit(0);
        }
    }

    private setFunctionToExecute(userOptions: string[], param: string, cliFunction?: ICLIFunction): void {
        if(!cliFunction) 
            throw new InvalidFunctionException("Invalid cli function. Type alix help for more info.");
        
        this.functionToExecute?.setOptions(userOptions)
        this.functionToExecute?.setParam(param)
    }

    private parseArgs(args: string[]): IParsedArgs {
        if (args.length < 1) 
            throw new ArgCountException('Invalid number of arguments. Type alix help for more info.');
    
        const parsedArgs: IParsedArgs = {
            userOptions: args.slice(1, -1),
            functionName: args[0],
            functionParam: args[args.length - 1]
        }

        return parsedArgs;
    }

    public async executeCLIFunction(): Promise<void> {
        try {
            const output = await this.functionToExecute!.executeAsync();
            console.log(output);
        }
        catch(error: any) {
            console.error(error.errorCode, error.message);
            process.exit(0);
        }
    }

}