import { CustomErrorException } from '../models/CustomErrorException';
import { ICommand } from '../models/ICommand';
import { IOption } from '../models/IOption';
import { DescOption } from '../options/DescOption';
import { PicsOption } from '../options/PicsOption';
import { TitleOption } from '../options/TitleOption';
import { CommandService } from '../services/CommandService';

export class GetCommand implements ICommand {
    public name: string;
    
    private param: string;
    private requestedOptions: IOption[];
    private acceptedOptions: IOption[];

    constructor(private readonly commandService: CommandService) {
        this.name = 'get'
        this.param = ''
        this.requestedOptions = []
        this.acceptedOptions = [ 
            new TitleOption(commandService),
            new DescOption(commandService),
            new PicsOption(commandService)
        ]
    }

    // Compares the requested options against the accepted.
    public setOptions(optionNames: string[] = []): void {
        try {
            if(optionNames.length == 0)
                throw new CustomErrorException('Options error:', 'Please specify at least 1 option. Type alix help for more info.')
    
            for(const optionName of optionNames) {
                const acceptedOption = this.acceptedOptions.find(option => option.name === optionName)
                
                if(!acceptedOption)
                    throw new CustomErrorException('Options error:', 'Invalid option specified. Type alix help for more info.')
    
                this.requestedOptions.push(acceptedOption)
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

    // Execute all the options into a formatted response
    public async executeAsync(): Promise<string> {
        let result: string = ''

        this.requestedOptions.forEach(async requestedOption => {
            const response = await requestedOption.executeAsync()
            result += response + '\n'
        })

        return result
    }

}