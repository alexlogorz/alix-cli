"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AlixCLI_1 = require("./AlixCLI");
const TitleCommand_1 = require("./commands/TitleCommand");
const HelpCommand_1 = require("./commands/HelpCommand");
const CleanCommand_1 = require("./commands/CleanCommand");
const ImageCommand_1 = require("./commands/ImageCommand");
const SetCommand_1 = require("./commands/SetCommand");
const commands = [
    new TitleCommand_1.TitleCommand('-t'),
    new HelpCommand_1.HelpCommand('help'),
    new CleanCommand_1.CleanCommand('clean'),
    new ImageCommand_1.ImageCommand('-p'),
    new SetCommand_1.SetCommand('set')
];
const alix = new AlixCLI_1.AlixCLI(commands);
const args = process.argv.slice(2);
alix.parse(args);
