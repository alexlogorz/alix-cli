#!/usr/bin/env node

import path from 'path'
import dotenv from 'dotenv'
import { CLI } from "./CLI"; 
import { IOption } from "./models/IOption";
import { FunctionService } from "./services/FunctionService";
import { GetFunction, SetFunction, CleanFunction, HelpFunction } from './cli-functions/functions';

dotenv.config({ path: path.join(__dirname, './../.env') });

const functionService: FunctionService = new FunctionService();

const options: IOption[] = [ { name: '--title' }, { name: '--desc' }, { name: '--pics' } ]

functionService.addCliFunction(new GetFunction(options, functionService))
functionService.addCliFunction(new SetFunction(functionService))
functionService.addCliFunction(new CleanFunction(functionService))
functionService.addCliFunction(new HelpFunction())

// The CLI will take the users command line args and process them.
const alix = new CLI(functionService);

alix.executeCLIFunction();