import { ICLIFunction } from '../models/ICLIFunction';
import { FunctionService } from '../services/FunctionService';
import packageJSON from './../../package.json';

export class HelpFunction implements ICLIFunction
{
    public name: string;

    constructor(private readonly functionService?: FunctionService) {
        this.name = 'help'
    }


    // This ClI function doesnt require any options.
    public setOptions(options: string[]): void {
        return undefined
    }
    
    // This CLI function doesnt require a param.
    public setParam(value: string): void {
        return undefined
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
            1. Type alix set "your_api_key_value" to set your api key. This is required for the commands that use generative ai.
            2. alix get --title --desc --pics "your_product_url". At least 1 option, such as --title must be specified.
            3. Type alix clean to clear all images from the product_images folder. Useful for when you are done using the downloaded images.
            4. Type alix help for a list of available commands and version info. 
        
        `;
        
        return Promise.resolve(helpPrompt);
    }
    
}