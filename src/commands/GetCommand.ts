import { CustomErrorException } from '../models/CustomErrorException';
import { ICommand } from '../models/ICommand';
import { IOption } from '../models/IOption';
import { CommandService } from '../services/CommandService';

export class GetCommand implements ICommand {
    public name: string;
    
    private param: string;
    private availableOptions: IOption[];
    private userOptions: IOption[];

    constructor(availableOptions: IOption[], private readonly commandService?: CommandService) {
        this.name = 'get'
        this.param = ''
        this.availableOptions = availableOptions
        this.userOptions = []
    }

    public setOptions(optionNames: string[] = []): void {
        try {
            if(optionNames.length == 0)
                throw new CustomErrorException('Options error:', 'Please specify at least 1 option. Type alix help for more info.')
    
            for(const optionName of optionNames) {
                const acceptedOption = this.availableOptions.find(option => option.name === optionName)
                
                if(!acceptedOption)
                    throw new CustomErrorException('Options error:', 'Invalid option specified. Type alix help for more info.')
    
                this.userOptions.push(acceptedOption)
            }
        }
        catch(error: any) {
            console.error(error.errorCode, error.message)
            process.exit(1)
        }
    }

    public setParam(value: string): void {
        try {
            if(value === '')
                throw new CustomErrorException('Param error:', 'No product url was specified. Type alix help for more info.')
            
            this.param = value
        }
        catch(error: any) {
            console.error(error.errorCode, error.message)
            process.exit(1)
        }
    }

    public async executeAsync(): Promise<string> {
        let result: string = ''

        this.userOptions.forEach(async userOption => {
            const response = await userOption.executeAsync()
            result += response + '\n'
        })

        return result
    }

}