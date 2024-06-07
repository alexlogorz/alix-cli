export interface ICommandStrategy
{
    readonly name: string;
    executeAsync(): Promise<string>;
}