import { GenerateContentResult, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { TitleFunction } from './TitleFunction';
import { IFunction } from '../models/IFunction';
import { ExecuteFunctionException } from "../models/ExecuteFunctionException";


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

    private extractJsonFromString(inputString: string) {
        const startIndex = inputString.indexOf('{');
        const endIndex = inputString.lastIndexOf('}');
        const jsonString = inputString.substring(startIndex, endIndex + 1);
        
        return jsonString;
    }

    public async executeAsync(): Promise<string> {
        try {
            const titleCommand = new TitleFunction();
            let formattedTextResponse: string;

            titleCommand.setParam(this.param || "")

            const title = await titleCommand.executeAsync()
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
            
            formattedTextResponse = `${parsedJson.description}\n\n${formattedSellingPoints}\n\n${parsedJson.conclusion}
            `
            return `\x1b[32mProduct description (Generative AI):\x1b[0m ${formattedTextResponse}`
        } 
        catch(error: any) {
            throw new ExecuteFunctionException(error.message)
        }
    }
}