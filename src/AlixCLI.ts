export class AlixCLI {
    private commands: ICommand[];
    private commandName?: string;
    private commandParam?: string;
    private commandInstance?: ICommand;

    constructor(commands: ICommand[]) { 
        this.commands = commands 
    }

    public parse(args: string[]): void {
        this.commandName = args[0]
        this.commandParam = args[1]
        this.setCommandInstance(this.commandName)
        
        if(!this.commandInstance) {
            console.error('Invalid command. Type alix help for more info.')
            process.exit(0)
        }
        
        this.commandInstance.url = this.commandParam;
        this.commandInstance.apiKey = this.commandParam;

        this.execute(this.commandInstance)
    }

    private setCommandInstance(name: string): void {
        for (const command of this.commands) {
            if(command.name === name) {
                this.commandInstance = command
                return;
            }
        }
    }

    private execute(command: ICommand): void {
        command.execute()
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.error("\x1b[32mAn error occured:\x1b[0m", error.message)
            process.exit(0)
        })
    }


}

