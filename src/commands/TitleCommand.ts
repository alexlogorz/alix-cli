import puppeteer, { Browser, Page } from "puppeteer";

export class TitleCommand implements ICommand {
    public name: string;
    public url?: string;
    
    constructor(name: string) { 
        this.name = name;
    }

    public async execute(): Promise<string> {
        const browser: Browser = await puppeteer.launch();
        const page: Page = await browser.newPage();
        
        await page.goto(this.url || "");
        
        const title: string = await page.evaluate(() => {
            const titleElement = document.querySelector('h1[data-pl="product-title"]');

            if(!titleElement) 
                throw Error("No title found.");

            return titleElement.textContent || ""
        });
        
        await browser.close(); 

        return `\x1b[32mProduct title:\x1b[0m ${title}`
    }

    
    
}