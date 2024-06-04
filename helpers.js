const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const folderName = 'product_images';
const folderPath = path.join(process.cwd(), folderName);
const greenText = '\x1b[32m';
const resetText = '\x1b[0m';

function printHelp() {
    console.log(`${greenText}
     _____     ____       ___  ____  ___
    /  _  \\   |    |     |   | \\   \\/  /
   /  /_\\  \\  |    |     |   |  \\     / 
  /    |    \\ |    |___  |   |  /     \\ 
  \\____|___ / |________| |___| /___/\\__\\${resetText}
  `);
    console.log('\nversion 1.0\n')
    console.log('Alix (Ali extract) is a tool for getting product data from AliExpress. Developed by Alex Logorz.')
    console.log(`
    Available commands:
    1. Type alix -t 'product_url' for product title.
    2. Type alix -p 'product_url' for product pictures. 
    3. Type alix clean to clear all images from folder.
    4. Type alix help for available commands and version info.\n`)
}

/** @returns {number} The number of deleted images */
function deleteImages() {
    let numOfImagesDeleted = 0;
    if (fs.existsSync(folderPath)) {
        const files = fs.readdirSync(folderPath);
        files.forEach(file => {
            const fileToBeDeleted = path.join(folderPath, file);
            fs.unlinkSync(fileToBeDeleted);
            numOfImagesDeleted += 1;            
        });
    } 
    return numOfImagesDeleted
}

/** @returns {[string]} An array of the image urls */
async function downloadImagesFromAliExpress(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto(url);
  
    if (!fs.existsSync(folderPath)) 
      fs.mkdirSync(folderPath);
  
    const imageUrls = await page.evaluate(() => {
      const images = document.querySelectorAll('.slider--img--D7MJNPZ img');
      const urls = [];
  
      images.forEach(img => {
        const imgUrl = img.getAttribute('src').replace('_80x80', '')
        urls.push(imgUrl);
      });
  
      return urls;
    });
  
    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];
      const imageName = `image_${i}.jpg`;
      const imagePath = path.join(folderPath, imageName);
      const imageStream = await page.goto(imageUrl);
      
      fs.writeFileSync(imagePath, await imageStream.buffer());
    }
  
    await browser.close();
    return imageUrls;
}

  /** @returns {string} The product title from Aliexpress */
  async function getTitleFromAliExpress(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto(url);
    await page.waitForSelector('h1[data-pl="product-title"]');
    
    const title = await page.evaluate(() => {
        const titleElement = document.querySelector('h1[data-pl="product-title"]');
        return titleElement.innerText;
    });
    
    await browser.close(); 
    return title
  }

module.exports = { deleteImages, downloadImagesFromAliExpress, getTitleFromAliExpress, printHelp, folderName, folderPath, greenText, resetText }