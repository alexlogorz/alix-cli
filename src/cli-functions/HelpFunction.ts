import { ExecuteFunctionException } from '../models/ExecuteFunctionException';
import { ICLIFunction } from '../models/ICLIFunction';
import { InvalidFunctionException } from '../models/InvalidFunctionException';
import { FunctionService } from '../services/FunctionService';
import packageJSON from './../../package.json';

export class HelpFunction implements ICLIFunction
{
    public name: string;

    constructor(private readonly functionService?: FunctionService) {
        this.name = 'help'
    }


    // This ClI function doesnt require any options.
    public setOptions(options: string[] = []): void {
        if(options.length > 0) 
            throw new InvalidFunctionException('Invalid function format. Type alix help for more info.')
    }
    
    // This CLI function doesnt require a param.
    public setParam(value: string): void {
        if(value.length > 0)
            throw new InvalidFunctionException('Invalid function format. Type alix help for more info.')
    }
   
    public async executeAsync(): Promise<string>
    {
        const version = packageJSON.version;
        const helpPrompt = `
        \x1b[32m
            _____     ____       ___  ____  ___
           /  _  \\   |    |     |   | \\   \\/  /
          /  /_\\  \\  |    |     |   |  \\     / 
         /    |    \\ |    |___  |   |  /     \\ 
         \\____|___ / |________| |___| /___/\\__\\
         \x1b[0m
          
         version ${version}
            
         Alix (Ali extract) is a semi-automation tool used for Dropshipping. Developed by Alex Logorz.
            
         Available commands:
            1. alix set "your api key here" 
               - This is required for commands that use generative ai.

            2. alix get --title --desc --pics "your products url here"
               - At least 1 option, such as --title must be specified.

            3. alix clean 
               - Deletes the images from product_images

            4. alix help
               - List of available commands and version info.
        
        `;
        
        return Promise.resolve(helpPrompt);
    }
    
}