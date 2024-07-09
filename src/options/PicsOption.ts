import path from "node:path";
import { IOption } from "../models/IOption";
import { CommandService } from "../services/CommandService";

export class PicsOption implements IOption {
    public name: string;
    
    private destination: string;

    constructor(private readonly commandService: CommandService) {
        this.name = '--pics'
        this.destination = path.join(process.cwd(), 'product_images');
    }

    public async executeAsync(): Promise<string> {
        const result = await this.commandService.downloadImagesAsync(this.destination)
        return result
    }

    
}