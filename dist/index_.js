"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AlixCLI_1 = require("./AlixCLI");
const TitleCommand_1 = require("./commands/TitleCommand");
const HelpCommand_1 = require("./commands/HelpCommand");
const commands = [new TitleCommand_1.TitleCommand('-t'), new HelpCommand_1.HelpCommand('help')];
const alix = new AlixCLI_1.AlixCLI(commands);
const args = process.argv.slice(2);
alix.parse(args);
