#!/usr/bin/env node

import path from 'path'
import dotenv from 'dotenv'
import { CLI } from "./CLI"; 
import { CommandService } from "./services/CommandService";

dotenv.config({ path: path.join(__dirname, './../.env') });

// Injecting singleton
const alix = new CLI(CommandService.getInstance());

// The ClI will take the command line args from the user and process them.
console.log('Processing...')
alix.executeAsync()
.then(result => { 
    console.log(result)
    console.log('...Done')
})
