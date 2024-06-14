import { IFunction } from './../models/IFunction';
import packageJSON from './../../package.json';

export class HelpFunction implements IFunction
{
    public name: string;

    constructor() {
        this.name = 'help'
    }
    
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
            
         Alix (Ali extract) is a tool for getting product data from AliExpress. Developed by Alex Logorz.
            
         Available commands:
            1. Type alix title "your_product_url" for product title.
            2. Type alix images "your_product_url" for product pictures. 
            3. Type alix set "your_api_key_value" to set your api key.
            4. Type alix clean to clear all images from folder.
            5. Type alix desc "your_product_url" to generate a product desc using ai.
            6. Type alix help for available commands and version info. 
            
        `;
        
        return Promise.resolve(helpPrompt);
    }
    
}