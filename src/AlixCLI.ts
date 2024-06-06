import { ICommand } from './abstractions/ICommand';
import { NotFoundException } from './abstractions/exceptions';

export class AlixCLI implements ICommand {

    private readonly commandName: string;
    private readonly commandParam?: string;
    private commandInstance?: ICommand;

    // private readonly args: Array<string>;

    constructor(
        private readonly commands: Array<ICommand>
    )
    {
        if(!Array.isArray(this.commands)) {
            throw new Error('Argument Exception');
        }
        // TODO: validation logic for this...
        const args = process.argv.slice(2);
        const [cmdName, cmdParam] = args;
        this.commandName = cmdName;// TODO: if this is not defined we need to throw an error! or maybe default to help command
        this.commandParam = cmdParam;
    }

    public get name(){
        return 'command executioner';
    }


    public setStrategy(cmdName: string): void {
        // TODO: regex for case insensitiveness
        const cmdContext = this.commands.find(cmd => cmd.name === cmdName);
        if(!cmdContext) {
            // TODO: Create custom error type
            throw new NotFoundException(cmdName);
        }
        this.commandInstance = cmdContext;
    }

    public async executeAsync(): Promise<string>
    {
        this.setStrategy(this.commandName);

        // TODO: remove url and apiKey from ICommand interface
        this.commandInstance!.url = this.commandParam;
        this.commandInstance!.apiKey = this.commandParam;
        
        const output = await this.commandInstance!.executeAsync();
        console.log(output);
        return output;
    }

}