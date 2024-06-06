import fs from 'fs'
import path from 'path'

export class SetCommand implements ICommand {
    public name: string;
    public apiKey?: string;
    private envFilePath: string;

    constructor(name: string) {
        this.name = name
        this.envFilePath = path.join(__dirname, '../../.env');
        console.log(this.envFilePath)
    }

    public async execute(): Promise<string> {
        fs.writeFileSync(this.envFilePath, `GEMINI_API_KEY=${this.apiKey}\n`, { flag: 'w' });
        return `\x1b[32mYour API key has been set.\x1b[0m`
    }

}