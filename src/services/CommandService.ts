import fs from 'node:fs';
import path from 'node:path';
import puppeteer, { Browser, Page } from "puppeteer";
import { GenerateContentResult, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { CustomErrorException } from '../models/CustomErrorException';

// Singleton pattern
export class CommandService {
    private model: GenerativeModel;
    private browser?: Browser;
    private page?: Page;
    private static instance: CommandService;

    private constructor() {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
        this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    }

    public static getInstance(): CommandService {
        if(!CommandService.instance) {
            CommandService.instance = new CommandService();
        } 
        return CommandService.instance
    }

    public async setNavigation(url: string): Promise<void> {
        this.browser = await puppeteer.launch()
        this.page = await this.browser?.newPage();
        await this.page?.goto(url)
    }

    public async closeNavigation() {
        await this.browser?.close()
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
    public async getDescAsync(): Promise<string> {
        try {
            const title: string = await this.getTitleAsync()
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
    public async getTitleAsync(): Promise<string> {
        try {
            const title: string = await this.page?.evaluate(() => {
                const titleElement = document.querySelector('h1[data-pl="product-title"]');
                return titleElement?.textContent || ''
            }) || ''

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
    public async downloadImagesAsync(destination: string): Promise<string> {
        try {
            if (!fs.existsSync(destination)) 
                fs.mkdirSync(destination);
            
            const imageUrls: string[] = await this.page?.evaluate(() => {
                const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('.slider--img--D7MJNPZ img');
                const urls: string[] = [];

                images.forEach(img => {
                    const imgUrl = img.getAttribute('src')?.replace('_80x80', '')
                    urls.push(imgUrl || "");
                });

                return urls;
            }) || []
            
            for (let i = 0; i < imageUrls.length; i++) {
                const imageUrl: string = imageUrls[i];
                const imageName: string = `image_${i}.jpg`;
                const imagePath: string = path.join(destination, imageName);
                const imageStream = await this.page?.goto(imageUrl);
                
                if(imageStream)
                    fs.writeFileSync(imagePath, await imageStream.buffer());
            }
            
            return `\x1b[32m${imageUrls.length} images\x1b[0m downloaded into ${destination}`
        }
        catch(error: any) {
            const customError = new CustomErrorException('Download error:', error.message)
            console.error(customError.errorCode, customError.message)
            process.exit(1)
        }
    }

}