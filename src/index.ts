#!/usr/bin/env node

import path from 'path'
import dotenv from 'dotenv'
import { CLI } from "./CLI"; 
import { ICommand } from './models/ICommand';
import { CommandService } from "./services/CommandService";
import { GetCommand, SetCommand, CleanCommand, HelpCommand } from './commands/commands';

dotenv.config({ path: path.join(__dirname, './../.env') });

const commandService: CommandService = new CommandService();

// Commands we are supporting.
const commands: ICommand[] = [ 
    new GetCommand(commandService),
    new SetCommand(commandService),
    new CleanCommand(commandService),
    new HelpCommand(commandService)
]

commands.forEach(command => { commandService.addCliCommand(command) })

// Takes the cli args and sets the target command for execution.
const alix = new CLI(commandService);

alix.executeAsync();
