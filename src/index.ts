#!/usr/bin/env node

import { CLI } from "./CLI"; 
import { TitleCommandStrategy } from "./commands/TitleCommandStrategy";
import { HelpCommandStrategy } from "./commands/HelpCommandStrategy";
import { CleanCommandStrategy } from "./commands/CleanCommandStrategy";
import { ImageCommandStrategy } from "./commands/ImageCommandStrategy";
import { SetCommandStrategy } from "./commands/SetCommandStrategy";
import { DescCommandStrategy } from "./commands/DescCommandStrategy";

// TODO: change this so that we can work with typescript
require('dotenv').config();

// commands we are supporting
const commands = [ 
    new TitleCommandStrategy(), 
    new HelpCommandStrategy(),
    new CleanCommandStrategy(),
    new ImageCommandStrategy(),
    new SetCommandStrategy(),
    new DescCommandStrategy(),
];

const alix = new CLI(commands);

alix.invokeCommand();