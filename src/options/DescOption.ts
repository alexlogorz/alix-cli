import { IOption } from "../models/IOption";
import { CommandService } from "../services/CommandService";

export class DescOption implements IOption {
    public name: string;
    
    private param: string;

    constructor(private readonly commandService: CommandService) {
        this.name = '--desc'
        this.param = ''
    }

    setParam(value: string): void {
        this.param = value;
    }

    public async executeAsync(): Promise<string> {
        const result = await this.commandService.getDescAsync(this.param)
        return result
    }

    
}