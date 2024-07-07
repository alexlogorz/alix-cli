
export interface IOption {
    name: string;
    executeAsync(): Promise<string>
} 