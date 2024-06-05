import puppeteer, { Browser, Page } from "puppeteer";
import fs from 'fs'
import path from 'path'

export class ImageCommand implements ICommand {
    public name: string;
    public url?: string;
    private folderName: string;
    private folderPath: string;

    constructor(name: string) {
        this.name = name;
        this.folderName = 'product_images'
        this.folderPath = path.join(process.cwd(), this.folderName)
    }

    public async execute(): Promise<string> {
        const browser: Browser = await puppeteer.launch();
        const page: Page = await browser.newPage();
        const pageUrl = this.url || "";
    
        await page.goto(pageUrl);
    
        if (!fs.existsSync(this.folderPath)) 
            fs.mkdirSync(this.folderPath);
    
        const imageUrls: string[] = await page.evaluate(() => {
            const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('.slider--img--D7MJNPZ img');
            const urls: string[] = [];
    
            images.forEach(img => {
                const imgUrl: string | null = img.getAttribute('src');
                if (imgUrl) {
                    const cleanedUrl: string = imgUrl.replace('_80x80', '');
                    urls.push(cleanedUrl);
                }
            });
    
            return urls;
        });
    
        await browser.close();

        return "\x1b[32m" + imageUrls.length + " images deleted from " + this.folderPath + "\x1b[0m"

    }
    


}