import { ICLIFunction } from './models/ICLIFunction';
import { InvalidFunctionException } from './models/InvalidFunctionException';
import { IParsedArgs } from './models/IParsedArgs'
import { FunctionService } from './services/FunctionService';

export class CLI {

    private functionToExecute: ICLIFunction | undefined;
    
    constructor(private readonly functionService: FunctionService) {
        const args = process.argv.slice(2);
        const parsedArgs: IParsedArgs = this.parseArgs(args)
        const { functionName, userOptions, functionParam } = parsedArgs
        
        const cliFunction = this.functionService.getCliFunctions().find(cliFunction => cliFunction.name === functionName);

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

        this.functionToExecute = cliFunction
        
        this.functionToExecute?.setOptions(userOptions)
        this.functionToExecute?.setParam(param)
    }

    private parseArgs(args: string[]): IParsedArgs {
        try {
            if (args.length == 0) 
                throw new InvalidFunctionException('No function was specified. Type alix help for more info.');
        
            const parsedArgs: IParsedArgs = {
                functionName: args[0],
                userOptions: args.length > 2 ? args.slice(1, -1) : [],
                functionParam: args.length > 1 ? args[args.length - 1] : ''
            }
            
            console.log('parsedArgs', parsedArgs)

            return parsedArgs;
        }
        catch(error: any) {
            console.error(error.errorCode, error.message);
            process.exit(0);
        }
    }

    public async executeAsync(): Promise<void> {
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