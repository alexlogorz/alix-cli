"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpCommand = void 0;
class HelpCommand {
    constructor(name) {
        this.name = name;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
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
            
        `;
        });
    }
}
exports.HelpCommand = HelpCommand;
