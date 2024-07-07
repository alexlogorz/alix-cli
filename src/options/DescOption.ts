import { IOption } from "../models/IOption";
import { CommandService } from "../services/CommandService";

export class  DescOption implements IOption {
    name: string;
    param: string;

    constructor(private readonly commandService: CommandService) {
        this.name = '--desc'
        this.param = ''
    }

    public async executeAsync(): Promise<string> {
        const result = await this.commandService.getDescAsync(this.param)
        return result
    }

    
}