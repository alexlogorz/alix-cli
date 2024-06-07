import fs from 'node:fs'
import path from 'node:path'
import { ICommandStrategy } from '../abstractions/ICommandStrategy';

export class SetCommandStrategy implements ICommandStrategy {
    public param?: string;
    public name: string;
    private envFilePath: string;

    constructor() {
        this.name = 'set'
        this.envFilePath = path.join(__dirname, '../../.env');
    }

    public async executeAsync(): Promise<string> {
        fs.writeFileSync(this.envFilePath, `GEMINI_API_KEY=${this.param}\n`, { flag: 'w' });
        return `\x1b[32mYour API key has been set.\x1b[0m`
    }

}