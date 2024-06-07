import fs from 'node:fs';
import path from 'node:path';
import { ICommandStrategy } from '../abstractions/ICommandStrategy';

export class CleanCommandStrategy implements ICommandStrategy {
    private folderName: string;
    private folderPath: string;
    public name: string;

   
    constructor() {
        this.folderName = 'product_images';
        this.folderPath = path.join(process.cwd(), this.folderName);
        this.name = 'clean'
    }

    public async executeAsync(): Promise<string> {
        let numOfImagesDeleted = 0;
        
        if (fs.existsSync(this.folderPath)) {
            const files = fs.readdirSync(this.folderPath);
            
            files.forEach(file => {
                const fileToBeDeleted = path.join(this.folderPath, file);
                fs.unlinkSync(fileToBeDeleted);
                numOfImagesDeleted += 1;            
            });
            return `\x1b[32m${numOfImagesDeleted} images\x1b[0m deleted from ${this.folderPath}`;
        }
        return `\x1b[32m${this.folderName}\x1b[0m folder wasn't found here. Nothing to delete.`;
    }
}