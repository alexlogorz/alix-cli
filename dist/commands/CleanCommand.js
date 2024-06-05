"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CleanCommand = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CleanCommand {
    constructor(name) {
        this.name = name;
        this.folderName = 'product_images';
        this.folderPath = path_1.default.join(process.cwd(), this.folderName);
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            let numOfImagesDeleted = 0;
            if (fs_1.default.existsSync(this.folderPath)) {
                const files = fs_1.default.readdirSync(this.folderPath);
                files.forEach(file => {
                    const fileToBeDeleted = path_1.default.join(this.folderPath, file);
                    fs_1.default.unlinkSync(fileToBeDeleted);
                    numOfImagesDeleted += 1;
                });
            }
            return "\x1b[32m" + numOfImagesDeleted + " images deleted from " + this.folderPath + "\x1b[0m";
        });
    }
}
exports.CleanCommand = CleanCommand;
