import { ICLIFunction } from '../models/ICLIFunction';
import { IOption } from '../models/IOption';
import { FunctionService } from '../services/FunctionService';
import { ExecuteFunctionException } from '../models/ExecuteFunctionException';
import { InvalidFunctionException } from '../models/InvalidFunctionException';

export class GetFunction implements ICLIFunction {
    public name: string;
    
    private param: string;
    private acceptedOptions: IOption[];
    private userProvidedOptions: IOption[];

    constructor(acceptedOptions: IOption[], private readonly functionService: FunctionService) {
        this.name = 'get'
        this.param = ''
        this.userProvidedOptions = []
        this.acceptedOptions = acceptedOptions
    }

    public setOptions(userOptions: string[] = []): void {
        if(userOptions.length == 0)
            throw new InvalidFunctionException('Please specify at least 1 option. Type alix help for more info.')

        for(const userOption in userOptions) {
            const option = this.acceptedOptions.find(option => option.name === userOption.replace('--',''))
            
            if(!option)
                throw new InvalidFunctionException('Invalid option specified. Type alix help for more info.')

            this.userProvidedOptions.push(option)
        }
    }

    public setParam(value: string): void {
        if(value === '')
            throw new InvalidFunctionException('No product url was specified. Type alix help for more info.')

        this.param = value
    }

    public async executeAsync(): Promise<string> {
        try {
            let formattedResponse: string = ""

            this.userProvidedOptions.forEach(async userOption => {
                const correspondingFunction = this.functionService.getCliFunctions().find(cliFunction => cliFunction.name === userOption.name.replace('--',''))
    
                if(!correspondingFunction)
                    throw new ExecuteFunctionException(`No corresponding function was found for option ${userOption.name}`)
    
                correspondingFunction.setParam(this.param)
                
                const result = await correspondingFunction.executeAsync()
                
                formattedResponse += result + '\n'
            })
    
            return formattedResponse
        }
        catch(error: any) {
            throw new ExecuteFunctionException(error.message)
        }
    }

}