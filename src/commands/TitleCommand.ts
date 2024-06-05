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
        await page.waitForSelector('h1[data-pl="product-title"]');
        
        const title: string = await page.evaluate(() => {
            const titleElement: HTMLElement | null = document.querySelector('h1[data-pl="product-title"]');
            return titleElement?.innerText || "";
        });
        
        await browser.close(); 

        return "\x1b[32m" + "Product title: " + title + "\x1b[0m"
    }

    
    
}