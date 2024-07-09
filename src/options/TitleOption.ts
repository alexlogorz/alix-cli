import { IOption } from "../models/IOption";
import { CommandService } from "../services/CommandService";

export class TitleOption implements IOption {
    public name: string;
    
    constructor(private readonly commandService: CommandService) {
        this.name = '--title'
    }

    public async executeAsync(): Promise<string> {
        const result = await this.commandService.getTitleAsync()
        return result
    }

    
}