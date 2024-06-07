import { ICommandStrategy } from './abstractions/ICommandStrategy';
import { CommandNotFoundException } from './abstractions/CommandNotFoundException';

export class CLI {

    private commandName?: string;
    private commandParam?: string;
    private commandStrategy?: ICommandStrategy;

    constructor(private readonly commands: Array<ICommandStrategy>) {
        const args = process.argv.slice(2);
        // TODO: Check to see if valid command
        
    }

    public setCommandStrategy(cmdName: string): void {
        
    }

    public async invokeCommand(): Promise<void>
    {
        

        const output = await this.commandStrategy!.executeAsync();
        console.log(output);
    }

}