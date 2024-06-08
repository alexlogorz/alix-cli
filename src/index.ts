#!/usr/bin/env node

import { CLI } from "./CLI"; 
import { TitleFunction } from "./commands/TitleFunction";
import { HelpFunction } from "./commands/HelpFunction";
import { CleanFunction } from "./commands/CleanFunction";
import { ImageFunction } from "./commands/ImageFunction";
import { SetFunction } from "./commands/SetFunction";
import { DescFunction } from "./commands/DescFunction";

// TODO: change this so that we can work with typescript
require('dotenv').config();

// commands we are supporting
const commands = [ 
    new TitleFunction(), 
    new HelpFunction(),
    new CleanFunction(),
    new ImageFunction(),
    new SetFunction(),
    new DescFunction(),
];

const alix = new CLI(commands);

alix.invokeCommand();