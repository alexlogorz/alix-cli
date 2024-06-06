export interface ICommand
{
    readonly name: string;
    url?: string; 
    apiKey?: string;
    executeAsync(): Promise<string>;
}