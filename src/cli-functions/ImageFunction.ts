import path from 'node:path';
import { ICLIFunction } from '../models/ICLIFunction';
import { ExecuteFunctionException } from "./../models/ExecuteFunctionException";
import { ParamNotFoundException } from "../models/ParamNotFoundException";
import { FunctionService } from '../services/FunctionService'

export class ImageFunction implements ICLIFunction {
    public name: string;  
    
    private param: string;
    private folderName: string;
    private folderPath: string;

    constructor(private readonly functionService?: FunctionService) {
        this.name = 'images';
        this.param = ''
        this.folderName = 'product_images';
        this.folderPath = path.join(process.cwd(), this.folderName);
    }

    // This CLI function doesnt require any options.
    public setOptions(options: string[]): void {
      return undefined
    }

    public setParam(value: string): void {
      if(value === undefined)
        throw new ParamNotFoundException("This function requires a parameter.")

      this.param = value
    }

    public async executeAsync(): Promise<string> {
        try {
            const response: string = await this.functionService?.downloadImagesAsync(this.param, this.folderPath) || ''
            return response
        }
        catch(error: any) {
            throw new ExecuteFunctionException(error.message)
        }
    }
}