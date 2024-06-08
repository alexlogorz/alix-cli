export interface IFunction
{
    readonly name: string;
    executeAsync(): Promise<string>;
}