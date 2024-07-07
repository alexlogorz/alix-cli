import { CustomErrorException } from './models/CustomErrorException';
import { ICommand } from './models/ICommand';
import { IParsedArgs } from './models/IParsedArgs'
import { CommandService } from './services/CommandService';

export class CLI {

    private commandToExecute: ICommand | undefined;
    
    constructor(private readonly commandService: CommandService) {
        const args = process.argv.slice(2);
        const parsedArgs: IParsedArgs = this.parseArgs(args)
        const { commandName, userOptions, commandParam } = parsedArgs
    
        const cliCommand = this.commandService.getCliCommands().find(cliCommand => cliCommand.name === commandName);

        this.setCommandToExecute(userOptions, commandParam, cliCommand)
    }

    private setCommandToExecute(userOptions: string[], param: string, cliCommand?: ICommand): void {
        try {
            if(!cliCommand) 
                throw new CustomErrorException('Command error:', 'Invalid cli command. Type alix help for more info.');
    
            this.commandToExecute = cliCommand
            
            this.commandToExecute?.setOptions(userOptions)
            this.commandToExecute?.setParam(param)
        }
        catch(error: any) {
            console.error(error.errorCode, error.message)
            process.exit(1)
        }
    }

    private parseArgs(args: string[]): IParsedArgs {
        try {
            if (args.length == 0) 
                throw new CustomErrorException('Parsing error:', 'No command was specified. Type alix help for more info.');

            const parsedArgs: IParsedArgs = {
                commandName: args[0],
                userOptions: args.length >=3 ? args.slice(1, -1) : [],
                commandParam: args.length > 1 ? args[args.length - 1] : ''
            }

            return parsedArgs
        }
        catch(error: any) {
            console.error(error.errorCode, error.message)
            process.exit(1)
        }

    }

    public async executeAsync(): Promise<string> {
        const output = await this.commandToExecute!.executeAsync()
        return output
    }

}