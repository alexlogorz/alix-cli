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
exports.ImageCommand = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ImageCommand {
    constructor(name) {
        this.name = name;
        this.folderName = 'product_images';
        this.folderPath = path_1.default.join(process.cwd(), this.folderName);
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
            const pageUrl = this.url || "";
            yield page.goto(pageUrl);
            if (!fs_1.default.existsSync(this.folderPath))
                fs_1.default.mkdirSync(this.folderPath);
            const imageUrls = yield page.evaluate(() => {
                const images = document.querySelectorAll('.slider--img--D7MJNPZ img');
                const urls = [];
                images.forEach(img => {
                    const imgUrl = img.getAttribute('src');
                    if (imgUrl) {
                        const cleanedUrl = imgUrl.replace('_80x80', '');
                        urls.push(cleanedUrl);
                    }
                });
                return urls;
            });
            yield browser.close();
            return "\x1b[32m" + imageUrls.length + " images deleted from " + this.folderPath + "\x1b[0m";
        });
    }
}
exports.ImageCommand = ImageCommand;
