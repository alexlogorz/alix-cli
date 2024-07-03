#!/usr/bin/env node

import { CLI } from "./CLI"; 
import { TitleFunction } from "./cli-functions/TitleFunction";
import { HelpFunction } from "./cli-functions/HelpFunction";
import { CleanFunction } from "./cli-functions/CleanFunction";
import { ImageFunction } from "./cli-functions/ImageFunction";
import { SetFunction } from "./cli-functions/SetFunction";
import { DescFunction } from "./cli-functions/DescFunction";
import path from 'path'

const envFilePath = path.join(__dirname, './../.env');

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

alix.executeCLIFunction();