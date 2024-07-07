export interface ICommand
{
    readonly name: string;
   
    setParam(value: string): void;
    setOptions(options: string[]): void;
    executeAsync(): Promise<string>;
}