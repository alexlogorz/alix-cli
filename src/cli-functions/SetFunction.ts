import path from 'node:path'
import { ICLIFunction } from '../models/ICLIFunction';
import { ParamNotFoundException } from '../models/ParamNotFoundException';
import { FunctionService } from '../services/FunctionService';

export class SetFunction implements ICLIFunction {
    public name: string;
    
    private envFilePath: string;
    private param: string;

    constructor(private readonly functionService?: FunctionService) {
        this.name = 'set'
        this.param = ''
        this.envFilePath = path.join(__dirname, './../../.env');
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
        const result = this.functionService?.setApiKey(this.param, this.envFilePath) || ''
        return result
    }

}