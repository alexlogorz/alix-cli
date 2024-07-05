import { ICLIFunction } from '../models/ICLIFunction';
import { ParamNotFoundException } from '../models/ParamNotFoundException';
import { InvalidOptionException } from '../models/InvalidOptionException';
import { IOption } from '../models/IOption';
import { FunctionService } from '../services/FunctionService';
import { ExecuteFunctionException } from '../models/ExecuteFunctionException';

export class GetFunction implements ICLIFunction {
    public name: string;
    
    private param: string;

    constructor(private readonly options: IOption[], private readonly functionService?: FunctionService) {
        this.name = 'get'
        this.param = ''
    }

    public setOptions(userOptions: string[]): void {
        for(const userOption in userOptions) {
            const option = this.options.find(option => option.name === userOption)
            if(!option)
                throw new InvalidOptionException('Invalid option provided. Type alix help for more info.')

            this.options.push(option)
        }
    }

    public setParam(value: string): void {
        if(value === undefined)
            throw new ParamNotFoundException("This function requires a parameter.")

        this.param = value
    }

    public async executeAsync(): Promise<string> {
        try {
            let formattedResponse: string = ""

            // Go through each option and execute its corresponding cli function
            this.options.forEach(async option => {
                const cliFunction = this.functionService?.getCliFunctions().find(cliFunction => cliFunction.name === option.name.replace('--',''))
                
                if(!cliFunction)
                    throw new ExecuteFunctionException(`No matching function found for ${option.name}`)

                const result = await cliFunction.executeAsync()
                
                formattedResponse += result + '\n'
            })

            return formattedResponse
        }
        catch(error: any) {
            throw new ExecuteFunctionException(error.message)
        }
    }

}