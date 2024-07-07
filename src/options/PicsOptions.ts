import { IOption } from "../models/IOption";
import { CommandService } from "../services/CommandService";

export class  PicsOption implements IOption {
    name: string;
    destination: string;
    param: string;

    constructor(private readonly commandService: CommandService) {
        this.name = '--pics'
        this.destination = ''
        this.param = ''
    }

    public async executeAsync(): Promise<string> {
        const result = await this.commandService.downloadImagesAsync(this.param, this.destination)
        return result
    }

    
}