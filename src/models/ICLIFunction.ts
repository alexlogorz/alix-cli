
export interface ICLIFunction
{
    readonly name: string;
   
    setParam(value: string): void;
    setOptions(options: string[]): void;
    executeAsync(): Promise<string>;
}