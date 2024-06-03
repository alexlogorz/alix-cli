#!/usr/bin/env node

const helpers = require('./helpers')

const args = process.argv.slice(2);

function main() {
    // matches the command alix -t 'product_url'
    if (args.length === 2 && args[0] === '-t') {
        const url = args[1];
        console.log('\nFetching url...\n')
        helpers.getTitleFromAliExpress(url)
        .then(response => {
            console.log(`${helpers.greenText}Product title:${helpers.resetText} ${response}\n`)
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
        helpers.downloadImagesFromAliExpress(url)
        .then(response => {
            console.log(`${helpers.greenText}${response.length} images${helpers.resetText} downloaded into ${helpers.folderPath}\n`)
        })
        .catch(error => {
            console.error(`Something went wrong: ${error}\n`)
            process.exit(0)
        })
    } 
    // matches the command alix clean
    else if (args.length === 1 && args[0] === 'clean') {
        console.log(`\nCleaning ${helpers.folderPath} ...\n`)
        const numOfImagesDeleted = helpers.deleteImages();
        console.log(`${helpers.greenText}${numOfImagesDeleted} images${helpers.resetText} deleted from ${helpers.folderPath}\n`)
    }  
    // matches the comand alix help
    else if (args.length === 1 && args[0] === 'help') {
        helpers.printHelp();
    } 
    // Any other command will fail
    else {
        console.log('\nInvalid command. Type alix help for more information.\n');
    }
}

main()



