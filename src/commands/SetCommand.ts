import path from 'node:path'
import { ICommand } from '../models/ICommand';
import { CommandService } from '../services/CommandService';
import { CustomErrorException } from '../models/CustomErrorException';

export class SetCommand implements ICommand {
    public name: string;
    
    private envFilePath: string;
    private param: string;

    constructor(private readonly commandService: CommandService) {
        this.name = 'set'
        this.param = ''
        this.envFilePath = path.join(__dirname, './../../.env');
    }

    public setOptions(options: string[] = []): void {
        try {
            if(options.length > 0) 
                throw new CustomErrorException('Options error:', 'This command only takes an api eky. Type alix help for more info.')
        }
        catch(error: any) {
            console.error(error.errorCode, error.message)
            process.exit(1)
        }
    }

    public setParam(value: string): void {
        try {
            if(value === '')
                throw new CustomErrorException('Param error:', 'No api key was specified. Type alix help for more info.')
            
            this.param = value
        }
        catch(error: any) {
            console.error(error.errorCode, error.message)
            process.exit(1)
        }
    }

    public async executeAsync(): Promise<string> {
        const result = this.commandService.setApiKey(this.param, this.envFilePath)
        return result
    }

}