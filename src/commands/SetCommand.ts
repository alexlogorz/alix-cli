import fs from 'node:fs'
import path from 'node:path'
import { ICommand } from './../abstractions/ICommand';

export class SetCommand implements ICommand {
    public apiKey?: string;
    private envFilePath: string;

    constructor() {
        this.envFilePath = path.join(__dirname, '../../.env');
    }

    public get name()
    {
      return 'set';
    }

    public async executeAsync(): Promise<string> {
        fs.writeFileSync(this.envFilePath, `GEMINI_API_KEY=${this.apiKey}\n`, { flag: 'w' });
        return `\x1b[32mYour API key has been set.\x1b[0m`
    }

}