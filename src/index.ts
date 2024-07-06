#!/usr/bin/env node

import path from 'path'
import dotenv from 'dotenv'
import { CLI } from "./CLI"; 
import { IOption } from "./models/IOption";
import { FunctionService } from "./services/FunctionService";
import { GetFunction, SetFunction, CleanFunction, HelpFunction } from './cli-functions/functions';
import { ICLIFunction } from './models/ICLIFunction';

dotenv.config({ path: path.join(__dirname, './../.env') });

const functionService: FunctionService = new FunctionService();

// Configure the options we are supporting.
const options: IOption[] = [ 
    {
        name: '--title',
        actionAsync: async function (param: string): Promise<string> {
            const result = await functionService.getTitleAsync(param)
            return result
        }
    }, 
    {
        name: '--desc',
        actionAsync: async function (param: string): Promise<string> {
            const result = await functionService.getTitleAsync(param)
            return result
        }
    },
    {
        name: '--pics',
        actionAsync: async function (param: string): Promise<string> {
            const result = await functionService.getTitleAsync(param)
            return result
        }
    } 
]

// Configure the commands we are supporting.
const commands: ICLIFunction[] = [ 
    new GetFunction(options),
    new SetFunction(functionService),
    new CleanFunction(functionService),
    new HelpFunction()
]

// Adds the commands to the service.
commands.forEach(command => { functionService.addCliFunction(command) })

// Takes the cli args and sets the target command for execution.
const alix = new CLI(functionService);

alix.executeAsync();
