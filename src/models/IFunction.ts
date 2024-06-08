export interface IFunction
{
    readonly name: string;
   
    setParam(value: string): void;
    executeAsync(): Promise<string>;
}