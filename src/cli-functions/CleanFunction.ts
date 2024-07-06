import path from 'node:path';
import { ICLIFunction } from '../models/ICLIFunction';
import { FunctionService } from '../services/FunctionService';
import { CustomErrorException } from '../models/CustomErrorException';

export class CleanFunction implements ICLIFunction {
    private folderName: string;
    private folderPath: string;
    
    public name: string;

    constructor(private readonly functionService?: FunctionService) {
        this.folderName = 'product_images';
        this.folderPath = path.join(process.cwd(), this.folderName);
        this.name = 'clean'
    }

    public setOptions(options: string[] = []): void {
        try {
            if(options.length > 0) 
                throw new CustomErrorException('Options error:', 'This command doesnt take any options. Type alix help for more info.')
        }
        catch(error: any) {
            console.error(error.errorCode, error.message)
            process.exit(1)
        }
    }

    public setParam(value: string): void {
        try {
            if(value.length > 0)
                throw new CustomErrorException('Param error:', 'This command doesnt take any parameters. Type alix help for more info.')
        }
        catch(error: any) {
            console.error(error.errorCode, error.message)
            process.exit(1)
        }
    }

    public async executeAsync(): Promise<string> {
        const response: string = await this.functionService?.deleteImages(this.folderPath) || ''
        return response
    }
}