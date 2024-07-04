import { ICLIFunction } from '../models/ICLIFunction';
import { ExecuteFunctionException } from "./../models/ExecuteFunctionException";
import { ParamNotFoundException } from "../models/ParamNotFoundException";
import { FunctionService } from "../services/FunctionService";

export class DescFunction implements ICLIFunction {
    public param: string;
    public name: string;
    
    constructor(private readonly functionService?: FunctionService) {
        this.name = 'desc'
        this.param = ''
    }

    // This ClI function doesnt require any options.
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
            const response: string = await this.functionService?.getDescAsync(this.param) || ''
            return response
        } 
        catch(error: any) {
            throw new ExecuteFunctionException(error.message)
        }
    }
}