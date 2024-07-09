import { IOption } from "../models/IOption";
import { CommandService } from "../services/CommandService";

export class DescOption implements IOption {
    public name: string;
    
    constructor(private readonly commandService: CommandService) {
        this.name = '--desc'
    }

    public async executeAsync(): Promise<string> {
        const result = await this.commandService.getDescAsync()
        return result
    }

    
}