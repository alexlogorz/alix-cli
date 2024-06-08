import puppeteer, { Browser, Page } from "puppeteer";
import { IFunction } from '../models/IFunction';

export class TitleFunction implements IFunction {
    public name: string;
    public param?: string;

    constructor() {
        this.name = 'title'
    }

    public setParam(value: string): void {
        this.param = value
    }

    public async executeAsync(): Promise<string> {
        const browser: Browser = await puppeteer.launch();
        const page: Page = await browser.newPage();
        
        await page.goto(this.param || '');
        
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