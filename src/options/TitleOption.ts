import { IOption } from "../models/IOption";
import { CommandService } from "../services/CommandService";

export class  TitleOption implements IOption {
    public name: string;
    
    private param: string;

    constructor(private readonly commandService: CommandService) {
        this.name = '--title'
        this.param = ''
    }

    public setParam(value: string): void {
        this.param = value
    }

    public async executeAsync(): Promise<string> {
        const result = await this.commandService.getTitleAsync(this.param)
        return result
    }

    
}