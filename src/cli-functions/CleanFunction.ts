import fs from 'node:fs';
import path from 'node:path';
import { ICLIFunction } from '../models/ICLIFunction';
import { ExecuteFunctionException } from './../models/ExecuteFunctionException';
import { FunctionService } from '../services/FunctionService';

export class CleanFunction implements ICLIFunction {
    private folderName: string;
    private folderPath: string;
    
    public name: string;

    constructor(private readonly functionService?: FunctionService) {
        this.folderName = 'product_images';
        this.folderPath = path.join(process.cwd(), this.folderName);
        this.name = 'clean'
    }

    // This CLI function doesnt require any options.
    public setOptions(options: string[]): void {
        return undefined
    }

    // This CLI function doesnt require a param.
    public setParam(value: string): void {
        return undefined;
    }

    public async executeAsync(): Promise<string> {
        try {
            const response: string = await this.functionService?.deleteImages(this.folderPath) || ''
            return response
        }
        catch(error: any) {
            throw new ExecuteFunctionException(error.message)
        }
    }
}