import { ICommandStrategy } from './abstractions/ICommandStrategy';
import { InvalidCommandException } from './abstractions/InvalidCommandException';
import { ArgumentNotFoundException } from './abstractions/ArgumentNotFoundException';
import { ParamNotFoundException } from './abstractions/ParamNotFoundException';

export class CLI {

    private commandStrategy?: ICommandStrategy;
    
    constructor(private readonly commands: Array<ICommandStrategy>) {
        const args = process.argv.slice(2);
        const [ commandName, commandParam ] = args

        try {
            if(args.length == 0) 
                throw new ArgumentNotFoundException("No arguments were given. Type alix help for more info.")
            
            const command = this.commands.find(command => command.name === commandName)

            if(!command)
                throw new InvalidCommandException("Invalid command. Type alix help for more info.")
            
            this.setCommandStrategy(command)

            if(this.commandStrategy?.hasOwnProperty('param') && !commandParam)
                throw new ParamNotFoundException("No command parameter was given. Type alix help for more info.")
            
        } 
        catch (error: any) {
            console.error(error.errorCode, error.message)
            process.exit(0)
        }
    }

    public setCommandStrategy(command: ICommandStrategy): void {
        this.commandStrategy = command
    }

    public async invokeCommand(): Promise<void>
    {
        const output = await this.commandStrategy!.executeAsync();
        console.log(output);
    }

}