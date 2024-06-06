import puppeteer, { Browser, Page } from "puppeteer";
import { ICommand } from './../abstractions/ICommand';

export class TitleCommand implements ICommand {
    public url?: string;

    public get name()
    {
        return 'title';
    }

    public async executeAsync(): Promise<string> {
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