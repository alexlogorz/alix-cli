interface ICommand {
    name: string;
    url?: string; 
    apiKey?: string;

    execute(): Promise<string>;
}