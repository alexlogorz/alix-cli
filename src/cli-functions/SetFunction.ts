import fs from 'node:fs'
import path from 'node:path'
import { ICLIFunction } from '../models/ICLIFunction';
import { ParamNotFoundException } from '../models/ParamNotFoundException';

export class SetFunction implements ICLIFunction {
    public name: string;
    
    private envFilePath: string;
    private param: string;

    constructor() {
        this.name = 'set'
        this.param = ''
        this.envFilePath = path.join(__dirname, './../../.env');
    }

    // This CLI function doesnt require any options.
    public setOptions(options: string[]): void {
        return undefined
    }

    public setParam(value: string): void {
        if(value === undefined)
            throw new ParamNotFoundException("This function requires a parameter.")

        this.param = value
    }

    public async executeAsync(): Promise<string> {
        fs.writeFileSync(this.envFilePath, `GEMINI_API_KEY=${this.param}\n`, { flag: 'w' });
        return `\x1b[32mYour API key has been set.\x1b[0m`
    }

}