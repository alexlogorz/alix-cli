import { AlixCLI } from "./AlixCLI"; 
import { TitleCommand } from "./commands/TitleCommand";
import { HelpCommand } from "./commands/HelpCommand";
import { CleanCommand } from "./commands/CleanCommand";
import { ImageCommand } from "./commands/ImageCommand";
import { SetCommand } from "./commands/SetCommand";

const commands: ICommand[] = [ 
    new TitleCommand('-t'), 
    new HelpCommand('help'),
    new CleanCommand('clean'),
    new ImageCommand('-p'),
    new SetCommand('set')
 ]
const alix = new AlixCLI(commands);
const args = process.argv.slice(2)

alix.parse(args)