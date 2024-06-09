# Alix CLI

Alix is a CLI tool that extracts product data and images from AliExpress. Moreover, it leverages generative AI to craft product descriptions for you.

## Table of Contents

- [Gemini AI](#gemini-ai)
- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)
- [Windows Installer](#windows-installer)
- [Mac Installer](#mac-installer)

## Gemini AI
This tool uses Google's Gemini AI which requires an api key. It can craft AliExpress product descriptions based on the product titles, leveraging advanced language understanding to enhance visibility, sales and save you time.

#### Obtaining API Key
1. Using your google account, sign into [Google AI Studio](https://ai.google.dev/aistudio)
2. Click on the **Get API Key** button. This will create an api key and new project id for you.

#### Important
If you use Gemini API from a project that has billing enabled, your use will be subject to [pay-as-you-go](https://ai.google.dev/pricing?_gl=1*czahyb*_ga*Nzk0MjIzOTI2LjE3MTc1MDczNDc.*_ga_P1DBVKWT6V*MTcxNzUzMzI4Ny4zLjEuMTcxNzUzNTI2NS42MC4wLjE0Njc2OTIxOTI.) pricing. 

## Installation

Before you begin, make sure you have [NodeJs](https://nodejs.org/en/download/package-manager) installed on your machine. After installation, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/alexlogorz/alix-cli.git
   ```
2. Navigate to the project directory:
   ```bash
   cd <project_directory>
   ```
3. Install dependancies:
   ```bash
   npm install
   ```
4. Build and compile the typescript code
   ```bash
    npm run build
   ```
5. Now you can install the package globally. This will allow you to use the cli from anywhere.
   ```bash
    npm install -g .
   ```

## Usage
Show a list of available commands and version info
``` bash
alix help
```

Sets your api key
``` bash
alix set "your_gemini_api_key"
```
Gets the products title
``` bash
alix title "link_to_aliexpress_product"
```
Downloads all the pictures into a folder
``` bash
alix images "link_to_aliexpress_product"
```
Removes all the pictures from the folder
``` bash
alix clean
```

**Important**
1. Your api key and product links must be enclosed in double quotation marks.
2. This tool has only been tested on https://aliexpress.us

## Windows Installer

## Mac Installer

## Support
If you need assistance regarding this tool, please reach me at alogorzmedia@gmail.com
