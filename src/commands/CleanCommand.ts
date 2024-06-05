import fs from 'fs'
import path from 'path'

export class CleanCommand implements ICommand {
    public name: string;
    private folderName: string;
    private folderPath: string;

    constructor(name: string) {
        this.name = name
        this.folderName = 'product_images'
        this.folderPath = path.join(process.cwd(), this.folderName)
    }

    public async execute(): Promise<string> {
        let numOfImagesDeleted = 0;
        if (fs.existsSync(this.folderPath)) {
            const files = fs.readdirSync(this.folderPath);
            files.forEach(file => {
                const fileToBeDeleted = path.join(this.folderPath, file);
                fs.unlinkSync(fileToBeDeleted);
                numOfImagesDeleted += 1;            
            });
        } 

        return "\x1b[32m" + numOfImagesDeleted + " images deleted from " + this.folderPath + "\x1b[0m"
    }

    
}