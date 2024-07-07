import { CustomErrorException } from '../models/CustomErrorException';
import { ICommand } from '../models/ICommand';
import packageJSON from '../../package.json';
import { CommandService } from '../services/CommandService';

export class HelpCommand implements ICommand
{
    public name: string;

    constructor(private readonly commandService: CommandService) {
        this.name = 'help'
    }


    // This ClI command doesnt require any options.
    public setOptions(options: string[] = []): void {
        try {
            if(options.length > 0) 
                throw new CustomErrorException('Options error:', 'Invalid command format. Type alix help for more info.')
        }
        catch(error: any) {
            console.error(error.errorCode, error.message)
            process.exit(1)
        }
        
    }
    
    // This CLI command doesnt require a param.
    public setParam(value: string): void {
        try {
            if(value.length > 0)
                throw new CustomErrorException('Param error:', 'Invalid command format. Type alix help for more info.')
        }
        catch(error: any) {
            console.error(error.errorCode, error.message)
            process.exit(1)
        }
        
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
          
         \x1b[32mVersion ${version}\x1b[0m
            
         Alix (Ali extract) is a semi-automation tool used for Dropshipping. Developed by Alex Logorz.
            
         \x1b[32mAvailable commands:\x1b[0m
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