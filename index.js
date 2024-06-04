#!/usr/bin/env node

require('dotenv').config()
require('./helpers')

const args = process.argv.slice(2);
const envFilePath = '.env';

// Create env file if it doesnt exist
if (!fs.existsSync(envFilePath)) 
    fs.writeFileSync(envFilePath, '');
   
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
    // matches the comand alix help
    else if (args.length === 1 && args[0] === 'help') {
        printHelp();
    } 
    // Any other command will fail
    else {
        console.log('\nInvalid command. Type alix help for more information.\n');
    }
}

main()



