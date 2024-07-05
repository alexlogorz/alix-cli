#!/usr/bin/env node

import path from 'path'
import dotenv from 'dotenv'
import { CLI } from "./CLI"; 
import { ICLIFunction } from "./models/ICLIFunction";
import { IOption } from "./models/IOptions";
import { FunctionService } from "./services/FunctionService";
import { GetFunction, SetFunction, CleanFunction, HelpFunction } from './cli-functions/functions';

dotenv.config({ path: path.join(__dirname, './../.env') });

const validFunctions: ICLIFunction[] = []
const functionService: FunctionService = new FunctionService();

// Create options
const titleOption: IOption = { name: '--title' }
const descOption: IOption = { name: '--desc' }
const downloadOption: IOption = { name: '--pics' }

// Create cli functions
const getFunction = new GetFunction([ titleOption, descOption, downloadOption ], functionService)
const setFunction = new SetFunction(functionService);
const cleanFunction = new CleanFunction(functionService);
const helpFunction = new HelpFunction()

// Push
validFunctions.push(getFunction)
validFunctions.push(helpFunction)
validFunctions.push(setFunction)
validFunctions.push(cleanFunction)

// The CLI will take the users command line args and process them.
const alix = new CLI(validFunctions);

alix.executeCLIFunction();