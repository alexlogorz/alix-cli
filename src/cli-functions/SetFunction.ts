import path from 'node:path'
import { ICLIFunction } from '../models/ICLIFunction';
import { FunctionService } from '../services/FunctionService';
import { ExecuteFunctionException } from '../models/ExecuteFunctionException';
import { InvalidFunctionException } from '../models/InvalidFunctionException';

export class SetFunction implements ICLIFunction {
    public name: string;
    
    private envFilePath: string;
    private param: string;

    constructor(private readonly functionService: FunctionService) {
        this.name = 'set'
        this.param = ''
        this.envFilePath = path.join(__dirname, './../../.env');
    }

    public setOptions(options: string[] = []): void {
        if(options.length > 0) 
            throw new InvalidFunctionException('This command only takes an api eky. Type alix help for more info.')
    }

    public setParam(value: string): void {
        if(value === '')
            throw new InvalidFunctionException('No api key was specified. Type alix help for more info.')

        this.param = value
    }

    public async executeAsync(): Promise<string> {
        try {
            const result = this.functionService.setApiKey(this.param, this.envFilePath) || ''
            return result
        }
        catch(error: any) {
            throw new ExecuteFunctionException(error.message);
        }
    }

}