export class HelpCommand implements ICommand {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }
   
    public async execute(): Promise<string> {
        return `
        \x1b[32m
            _____     ____       ___  ____  ___
           /  _  \\   |    |     |   | \\   \\/  /
          /  /_\\  \\  |    |     |   |  \\     / 
         /    |    \\ |    |___  |   |  /     \\ 
         \\____|___ / |________| |___| /___/\\__\\
         \x1b[0m
          
         version 1.0
            
         Alix (Ali extract) is a tool for getting product data from AliExpress. Developed by Alex Logorz.
            
         Available commands:
            1. Type alix -t "your_product_url" for product title.
            2. Type alix -p "your_product_url" for product pictures. 
            3. Type alix set "your_api_key_value" to set your api key.
            4. Type alix clean to clear all images from folder.
            5. Type alix help for available commands and version info. 
            
        `
    }
    
}