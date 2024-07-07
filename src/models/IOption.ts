export interface IOption 
{
    readonly name: string;

    setParam(value: string): void;
    executeAsync(): Promise<string>
} 