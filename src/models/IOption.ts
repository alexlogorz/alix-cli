export interface IOption 
{
    readonly name: string;

    executeAsync(): Promise<string>
} 