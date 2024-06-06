#!/usr/bin/env node

import { Invoker } from "./Invoker"; 
import { TitleCommand } from "./commands/TitleCommand";
import { HelpCommand } from "./commands/HelpCommand";
import { CleanCommand } from "./commands/CleanCommand";
import { ImageCommand } from "./commands/ImageCommand";
import { SetCommand } from "./commands/SetCommand";
import { DescCommand } from "./commands/DescCommand";

// TODO: change this so that we can work with typescript
require('dotenv').config();

// commands we are supporting
const commands = [ 
    new TitleCommand(), 
    new HelpCommand(),
    new CleanCommand(),
    new ImageCommand(),
    new SetCommand(),
    new DescCommand(),
];



const alix = new Invoker(commands);

alix.invokeCommand();