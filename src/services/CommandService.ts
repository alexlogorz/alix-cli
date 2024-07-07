import fs from 'node:fs';
import path from 'node:path';
import puppeteer, { Browser, Page } from "puppeteer";
import { GenerateContentResult, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { ICommand } from "../models/ICommand";
import { CustomErrorException } from '../models/CustomErrorException';

export class CommandService {
    private model: GenerativeModel;
    private cliCommands: Array<ICommand>;

    constructor() {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
        this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
        this.cliCommands = []
    }

    public getCliCommands(): Array<ICommand> {
        return this.cliCommands
    }

    public addCliCommand(cliCommand: ICommand): void {
        this.cliCommands.push(cliCommand)
    }

    private extractJsonFromString(inputString: string) {
        const startIndex = inputString.indexOf('{');
        const endIndex = inputString.lastIndexOf('}');
        const jsonString = inputString.substring(startIndex, endIndex + 1);
        
        return jsonString;
    }

    // Deletes the images from the folder
    public async deleteImages(folderPath: string): Promise<string> {
        let numOfImagesDeleted = 0;
        
        if (fs.existsSync(folderPath)) {
            const files = fs.readdirSync(folderPath);
            
            files.forEach(file => {
                const fileToBeDeleted = path.join(folderPath, file);
                fs.unlinkSync(fileToBeDeleted);
                numOfImagesDeleted += 1;            
            });
            
            return `\x1b[32m${numOfImagesDeleted} images\x1b[0m deleted from ${folderPath}`;
        }
        
        return `\x1b[32m${folderPath}\x1b[0m couldnt be resolved. Nothing to delete.`;
    }

    // Set api key
    public setApiKey(apiKey: string, filePath: string): string {
        fs.writeFileSync(filePath, `GEMINI_API_KEY=${apiKey}\n`, { flag: 'w' });
        return `\x1b[32mYour API key has been set.\x1b[0m`
    }

    // Get the product desc from url and process it using generative ai.
    public async getDescAsync(url: string): Promise<string> {
        try {
            const title: string = await this.getTitleAsync(url)
            const prompt: string = `
            Given this product title: ${title}. 
            Write me a short (1-2 sentence) product description to increase sales. Put it in the following JSON format:
            {
                description:
                selling_points: []
                conclusion:
            }
            `
            const result: GenerateContentResult = await this.model.generateContent(prompt);
            const response = await result.response;
            const parsedJson = JSON.parse(this.extractJsonFromString(response.text()))
            const formattedSellingPoints = parsedJson.selling_points.map((point: any) => `✔️ ${point}`).join('\n\n');
            
            const formattedTextResponse = `${parsedJson.description}\n\n${formattedSellingPoints}\n\n${parsedJson.conclusion}
            `
            return `\x1b[32mProduct description (Generative AI):\x1b[0m\n${formattedTextResponse}`
        }
        catch(error: any) {
            const customError = new CustomErrorException('Description error:', error.message)
            console.error(customError.errorCode, customError.message)
            process.exit(1)
        }
    }

    // Get the product title form url and process it using generative ai.
    public async getTitleAsync(url: string): Promise<string> {
        const browser: Browser = await puppeteer.launch();
        const page: Page = await browser.newPage();
        
        try {
            await page.goto(url);
        
            const title: string = await page.evaluate(() => {
                const titleElement = document.querySelector('h1[data-pl="product-title"]');
                return titleElement?.textContent || ''
            });

            await browser.close(); 

            const prompt: string = `Given this product title: ${title}. Re write it and make it between 70-100 characters in length. Do not include any formatting in your answer.`
            const result: GenerateContentResult = await this.model.generateContent(prompt)
            const generatedTitle = await result.response.text()

            return `\x1b[32mProduct title (Generative AI):\x1b[0m\n${generatedTitle}`
        }
        catch(error: any) {
            const customError = new CustomErrorException('Title error:', error.message)
            console.error(customError.errorCode, customError.message)
            process.exit(1)
        }
    }

    // Download product images from url
    public async downloadImagesAsync(url: string, destination: string): Promise<string> {
        const browser: Browser = await puppeteer.launch();
        const page: Page = await browser.newPage();
        
        try {
            await page.goto(url)
        
            if (!fs.existsSync(destination)) 
                fs.mkdirSync(destination);
            
            const imageUrls: string[] = await page.evaluate(() => {
                const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('.slider--img--D7MJNPZ img');
                const urls: string[] = [];

                images.forEach(img => {
                    const imgUrl = img.getAttribute('src')?.replace('_80x80', '')
                    urls.push(imgUrl || "");
                });

                return urls;
            });
            
            for (let i = 0; i < imageUrls.length; i++) {
                const imageUrl: string = imageUrls[i];
                const imageName: string = `image_${i}.jpg`;
                const imagePath: string = path.join(destination, imageName);
                const imageStream = await page.goto(imageUrl);
                
                if(imageStream)
                    fs.writeFileSync(imagePath, await imageStream.buffer());
            }
            
            await browser.close();

            return `\x1b[32m${imageUrls.length} images\x1b[0m downloaded into ${destination}`
        }
        catch(error: any) {
            const customError = new CustomErrorException('Download error:', error.message)
            console.error(customError.errorCode, customError.message)
            process.exit(1)
        }
    }

}