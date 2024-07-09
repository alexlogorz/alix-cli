#!/usr/bin/env node

import path from 'path'
import dotenv from 'dotenv'
import { CLI } from "./CLI"; 
import { CommandService } from "./services/CommandService";

dotenv.config({ path: path.join(__dirname, './../.env') });

const commandService: CommandService = new CommandService();

// Takes the cli args and sets the target command for execution.
const alix = new CLI(commandService);

alix.executeAsync()
.then(result => console.log(result))
