import { CustomErrorException } from './models/CustomErrorException';
import { ICommand } from './models/ICommand';
import { IParsedArgs } from './models/IParsedArgs'
import { CommandService } from './services/CommandService';
import { GetCommand, SetCommand, CleanCommand, HelpCommand } from './commands/commands';

export class CLI {

    private requestedCommand: ICommand | undefined;
    private acceptedCommands: ICommand[];

    constructor(private readonly commandService: CommandService) {
        this.acceptedCommands = [ 
            new GetCommand(commandService),
            new SetCommand(commandService),
            new CleanCommand(commandService),
            new HelpCommand(commandService)
        ]
        const args = process.argv.slice(2);
        const parsedArgs: IParsedArgs = this.parseArgs(args)
        const { commandName, userOptions, commandParam } = parsedArgs
    
        const command = this.acceptedCommands.find(command => command.name === commandName);

        this.setRequestedCommand(userOptions, commandParam, command)
    }

    private setRequestedCommand(userOptions: string[], param: string, command?: ICommand): void {
        try {
            if(!command) 
                throw new CustomErrorException('Command error:', 'Invalid cli command. Type alix help for more info.');
    
            this.requestedCommand = command
            
            this.requestedCommand?.setOptions(userOptions)
            this.requestedCommand?.setParam(param)
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
        const output = await this.requestedCommand!.executeAsync()
        return output
    }

}