import fs from 'node:fs'
import path from 'node:path'
import { ICLIFunction } from '../models/ICLIFunction';
import { ParamNotFoundException } from '../models/ParamNotFoundException';
import { InvalidOptionException } from '../models/InvalidOptionException';
import { IOption } from '../models/IOptions';

export class GetFunction implements ICLIFunction {
    public name: string;
    
    private envFilePath: string;
    private param: string;
    private options: IOption[];

    constructor(private readonly validOptions: Array<IOption>) {
        this.name = 'get'
        this.param = ''
        this.options = []
        this.envFilePath = path.join(__dirname, './../../.env');
    }

    public setOptions(userOptions: string[]): void {
        for(const userOption in userOptions) {
            const option = this.validOptions.find(option => option.name === userOption)

            if(!option)
                throw new InvalidOptionException('Invalid option provided. Type alix help for more info.')

            this.options.push(option)
        }
    }

    public setParam(value: string): void {
        if(value === undefined)
            throw new ParamNotFoundException("This function requires a parameter.")

        this.param = value
    }

    //TODO: Implement this method.
    public async executeAsync(): Promise<string> {
        
        return ''
    }

}