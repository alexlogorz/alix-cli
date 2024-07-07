import { IOption } from "../models/IOption";
import { CommandService } from "../services/CommandService";

export class  TitleOption implements IOption {
    name: string;
    param: string;

    constructor(private readonly commandService: CommandService) {
        this.name = '--title'
        this.param = ''
    }

    public async executeAsync(): Promise<string> {
        const result = await this.commandService.getTitleAsync(this.param)
        return result
    }

    
}