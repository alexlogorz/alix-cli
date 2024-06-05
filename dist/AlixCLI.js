"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlixCLI = void 0;
class AlixCLI {
    constructor(commands) {
        this.commands = commands;
    }
    parse(args) {
        const name = args[0];
        const url = args[1];
        const command = this.getCommand(name);
        if (!command)
            throw new Error('Invalid command. Type alix help for more information.');
        command.url = url;
        this.execute(command);
    }
    getCommand(name) {
        this.commands.forEach(command => {
            if (command.name === name)
                return command;
        });
        return null;
    }
    execute(command) {
        command.execute();
    }
}
exports.AlixCLI = AlixCLI;
