#!/usr/bin/env node

import path from 'path'
import dotenv from 'dotenv'
import { CLI } from "./CLI"; 
import { IOption } from "./models/IOption";
import { CommandService } from "./services/CommandService";
import { GetCommand, SetCommand, CleanCommand, HelpCommand } from './commands/commands';
import { ICommand } from './models/ICommand';

dotenv.config({ path: path.join(__dirname, './../.env') });

const commandService: CommandService = new CommandService();

// Configure the options we are supporting.
const options: IOption[] = [ 
]

// Configure the commands we are supporting.
const commands: ICommand[] = [ 
    new GetCommand(options),
    new SetCommand(commandService),
    new CleanCommand(commandService),
    new HelpCommand()
]

// Adds the commands to the service.
commands.forEach(command => { commandService.addCliCommands(command) })

// Takes the cli args and sets the target command for execution.
const alix = new CLI(commandService);

alix.executeAsync();
