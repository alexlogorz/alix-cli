#!/usr/bin/env node

const { 
    greenText, 
    resetText, 
    setApiKey, 
    printHelp,
    deleteImages,
    getTitleFromAliExpress, 
    downloadImagesFromAliExpress, 
} = require('./helpers');

require('dotenv').config()
require('./helpers')

const args = process.argv.slice(2);

// Note: Will plan to refactor the code in future data to apply SOLID principles.
function main() {
    // matches the command alix -t 'product_url'
    if (args.length === 2 && args[0] === '-t') {
        const url = args[1];
        console.log('\nFetching url...\n')
        getTitleFromAliExpress(url)
        .then(response => {
            console.log(`${greenText}Product title:${resetText} ${response}\n`)
        })
        .catch(error => {
            console.error(`Something went wrong: ${error}\n`)
            process.exit(0);
        })
    } 
    // matches the command alix -p 'product_url'
    else if (args.length === 2 && args[0] === '-p') {
        const url = args[1];
        console.log('\nFetching url...\n')
        downloadImagesFromAliExpress(url)
        .then(response => {
            console.log(`${greenText}${response.length} images${resetText} downloaded into ${folderPath}\n`)
        })
        .catch(error => {
            console.error(`Something went wrong: ${error}\n`)
            process.exit(0)
        })
    } 
    // matches the command alix clean
    else if (args.length === 1 && args[0] === 'clean') {
        console.log(`\nCleaning ${folderPath} ...\n`)
        const numOfImagesDeleted = deleteImages();
        console.log(`${greenText}${numOfImagesDeleted} images${resetText} deleted from ${folderPath}\n`)
    }  
    // matches the command alix set 'api_key_value'
    else if (args.length === 1 && args[0] === 'set') {
        console.log(`\nSetting your api key for google Gemini ai ...\n`)
        const keyValue = args[1]
        setApiKey(keyValue);
        console.log(`${greenText}Your api key has been set.${resetText}\n`)
    }
    // matches the command alix help
    else if (args.length === 1 && args[0] === 'help') {
        printHelp();
    } 
    // Any other command will fail
    else {
        console.log('\nInvalid command. Type alix help for more information.\n');
    }
}

main()



