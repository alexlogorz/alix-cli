#!/usr/bin/env node

import { CLI } from "./CLI"; 
import { TitleFunction } from "./cli-functions/TitleFunction";
import { HelpFunction } from "./cli-functions/HelpFunction";
import { CleanFunction } from "./cli-functions/CleanFunction";
import { ImageFunction } from "./cli-functions/ImageFunction";
import { SetFunction } from "./cli-functions/SetFunction";
import { DescFunction } from "./cli-functions/DescFunction";
import { GetFunction } from "./cli-functions/GetFunction";
import path from 'path'
import { ICLIFunction } from "./models/ICLIFunction";
import { IOption } from "./models/IOptions";
import { FunctionService } from "./services/FunctionService";

const envFilePath = path.join(__dirname, './../.env');

require('dotenv').config({ path: envFilePath });

const validFunctions: ICLIFunction[] = []
const functionService: FunctionService = new FunctionService();

// Create options
const titleOption: IOption = { name: '--title' }
const descOption: IOption = { name: '--desc' }
const downloadOption: IOption = { name: '--pics' }

// Create cli functions
const getFunction = new GetFunction([ titleOption, descOption, downloadOption ], functionService)
const helpFunction = new HelpFunction(functionService)
const setFunction = new SetFunction(functionService);
const cleanFunction = new CleanFunction(functionService);

// Push
validFunctions.push(getFunction)
validFunctions.push(helpFunction)
validFunctions.push(setFunction)
validFunctions.push(cleanFunction)

// The CLI will take the users command line args and process them.
const alix = new CLI(validFunctions);

alix.executeCLIFunction();