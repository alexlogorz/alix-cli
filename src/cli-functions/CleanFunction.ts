import path from 'node:path';
import { ICLIFunction } from '../models/ICLIFunction';
import { FunctionService } from '../services/FunctionService';
import { ExecuteFunctionException } from '../models/ExecuteFunctionException';
import { InvalidFunctionException } from '../models/InvalidFunctionException';

export class CleanFunction implements ICLIFunction {
    private folderName: string;
    private folderPath: string;
    
    public name: string;

    constructor(private readonly functionService: FunctionService) {
        this.folderName = 'product_images';
        this.folderPath = path.join(process.cwd(), this.folderName);
        this.name = 'clean'
    }

    public setOptions(options: string[] = []): void {
        if(options.length > 0) 
            throw new InvalidFunctionException('This command doesnt take any options. Type alix help for more info.')
    }

    public setParam(value: string): void {
        if(value.length > 0)
            throw new InvalidFunctionException('This command doesnt take any parameters. Type alix help for more info.')
    }

    public async executeAsync(): Promise<string> {
        try {
            const response: string = await this.functionService.deleteImages(this.folderPath) || ''
            return response
        }
        catch(error: any) {
            throw new ExecuteFunctionException(error.message);
        }
    }
}