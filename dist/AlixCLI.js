"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlixCLI = void 0;
class AlixCLI {
    constructor(commands) {
        this.commands = commands;
    }
    parse(args) {
        const commandName = args[0];
        const commandParam = args[1];
        const commandInstance = this.getCommand(commandName);
        if (!commandInstance)
            throw new Error('Invalid command. Type alix help for more information.');
        commandInstance.url = commandParam;
        commandInstance.apiKey = commandParam;
        this.execute(commandInstance);
    }
    getCommand(name) {
        this.commands.forEach(command => {
            if (command.name === name)
                return command;
        });
        return null;
    }
    execute(command) {
        command.execute()
            .then(response => {
            console.log(response);
        });
    }
}
exports.AlixCLI = AlixCLI;
