import { CustomErrorException } from './models/CustomErrorException';
import { ICLIFunction } from './models/ICLIFunction';
import { IParsedArgs } from './models/IParsedArgs'
import { FunctionService } from './services/FunctionService';

export class CLI {

    private functionToExecute: ICLIFunction | undefined;
    
    constructor(private readonly functionService: FunctionService) {
        const args = process.argv.slice(2);
        const parsedArgs: IParsedArgs = this.parseArgs(args)
        const { functionName, userOptions, functionParam } = parsedArgs
        
        const cliFunction = this.functionService.getCliFunctions().find(cliFunction => cliFunction.name === functionName);

        this.setFunctionToExecute(userOptions, functionParam, cliFunction)
    }

    private setFunctionToExecute(userOptions: string[], param: string, cliFunction?: ICLIFunction): void {
        try {
            if(!cliFunction) 
                throw new CustomErrorException('Command error:', 'Invalid cli function. Type alix help for more info.');
    
            this.functionToExecute = cliFunction
            
            this.functionToExecute?.setOptions(userOptions)
            this.functionToExecute?.setParam(param)
        }
        catch(error: any) {
            console.error(error.errorCode, error.message)
            process.exit(1)
        }
    }

    private parseArgs(args: string[]): IParsedArgs {
        try {
            if (args.length == 0) 
                throw new CustomErrorException('Parsing error:', 'No function was specified. Type alix help for more info.');

            const parsedArgs: IParsedArgs = {
                functionName: args[0],
                userOptions: args.length >=3 ? args.slice(1, -1) : [],
                functionParam: args.length > 1 ? args[args.length - 1] : ''
            }

            return parsedArgs
        }
        catch(error: any) {
            console.error(error.errorCode, error.message)
            process.exit(1)
        }

    }

    public async executeAsync(): Promise<string> {
        const output = await this.functionToExecute!.executeAsync()
        return output
    }

}