import { ICLIFunction } from './models/ICLIFunction';
import { InvalidFunctionException } from './models/InvalidFunctionException';
import { ArgCountException } from './models/ArgCountException';
import { IParsedArgs } from './models/IParsedArgs'

export class CLI {

    private functionToExecute: ICLIFunction | undefined;
    
    constructor(private readonly validCliFunctions: Array<ICLIFunction>) {
        try {
            const args = process.argv.slice(2);
            const parsedArgs: IParsedArgs = this.parseArgs(args)

            const userOptions = parsedArgs.userOptions
            const functionParam = parsedArgs.functionParam
            const functionName = parsedArgs.functionName

            const _functionToExecute = this.validCliFunctions.find(cliFunction => cliFunction.name === functionName);

            this.setFunctionToExecute(userOptions, functionParam, _functionToExecute)

        } 
        catch (error: any) {
            console.error(error.errorCode, error.message);
            process.exit(0);
        }
    }

    public setFunctionToExecute(userOptions: string[], param: string, cliFunction?: ICLIFunction): void {
        if(!cliFunction) 
            throw new InvalidFunctionException("Invalid cli function. Type alix help for more info.");
        
        this.functionToExecute?.setOptions(userOptions)
        this.functionToExecute?.setParam(param)
    }

    public parseArgs(args: string[]): IParsedArgs {
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