export class AlixCLI {
    private commands: ICommand[];
    
    constructor(commands: ICommand[]) { 
        this.commands = commands 
    }

    public parse(args: string[]): void {
        const commandName: string = args[0]
        const commandParam: string = args[1]
        const commandInstance: ICommand = this.getCommand(commandName)
        
        if(!commandInstance) 
            throw new Error('Invalid command. Type alix help for more information.')
        
        commandInstance.url = commandParam;
        commandInstance.apiKey = commandParam;
        
        this.execute(commandInstance)
    }

    private getCommand(name: string): any {
        this.commands.forEach(command => {
            if(command.name === name)
                return command
        })

        return null;
    }

    private execute(command: ICommand): void {
        command.execute()
        .then(response => {
            console.log(response)
        })
    }


}

