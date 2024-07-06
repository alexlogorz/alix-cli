
export interface IOption {
    name: string;
    actionAsync: (param: string) => Promise<string>;
} 