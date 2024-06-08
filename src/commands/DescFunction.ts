import { GenerateContentResult, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { TitleFunction } from './TitleFunction';
import { IFunction } from '../models/IFunction';


export class DescFunction implements IFunction {
    public param?: string;
    private model: GenerativeModel;
    public name: string;
  

    constructor() {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
       
        this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
        this.name = 'desc'
    }

    public setParam(value: string): void {
        this.param = value
    }

    public async executeAsync(): Promise<string> {
        // TODO: change logic so that we dont have to know this implementation detail!
        const titleCommand = new TitleFunction();
        let productDesc: string;

        titleCommand.param = this.param
        

        try {
            const title = await titleCommand.executeAsync()
            const prompt: string = `${title}. Write a nice product description based off the title. This is for facebook marketplace.`
            const result: GenerateContentResult = await this.model.generateContent(prompt);
            const response = await result.response;

            productDesc = response.text();
    
        } 
        catch(error: any) {
            console.error("\x1b[32mAn error occured:\x1b[0m", error)
            process.exit(0)
        }

        return `\x1b[32mProduct description (Generative AI):\x1b[0m ${productDesc}`
    }
}