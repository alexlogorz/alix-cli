#!/usr/bin/env node

import { CLI } from "./CLI"; 
import { TitleFunction } from "./commands/TitleFunction";
import { HelpFunction } from "./commands/HelpFunction";
import { CleanFunction } from "./commands/CleanFunction";
import { ImageFunction } from "./commands/ImageFunction";
import { SetFunction } from "./commands/SetFunction";
import { DescFunction } from "./commands/DescFunction";
import path from 'node:path'

const envFilePath = path.join(__dirname, '../.env');

require('dotenv').config({ path: envFilePath });

// CLI functions we are supporting
const cliFunctions = [ 
    new TitleFunction(), 
    new HelpFunction(),
    new CleanFunction(),
    new ImageFunction(),
    new SetFunction(),
    new DescFunction(),
];

const alix = new CLI(cliFunctions);

alix.invokeCommand();