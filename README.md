# Alix CLI

An application designed to extract product data from AliExpress, featuring advanced generative AI for automatic creation of titles and descriptions.

## Table of Contents

- [Screenshots](#screenshots)
- [Gemini AI](#gemini-ai)
- [Installation](#installation)
  - [Contributor](#contributor)
  - [Personal Use](#personal-use)
- [Usage](#usage)
- [Support](#support)

## Screenshots
   ```bash
   alix help
   ```
![Alix Pic 2](./assets/alix%20pic%202.png)
   ```bash
   alix get --title --desc --pics "https://www.aliexpress.us/item/3256806384027409.html"
   ```
![Alix Pic 1](./assets/alix%20pic%201.png)

## Gemini AI
Gemini AI is an advanced artificial intelligence tool developed by Google, offering powerful language understanding and generation capabilities. Our application uses this technology to craft product descriptions and titles.

#### Obtaining API Key
1. Using your google account, sign into [Google AI Studio](https://ai.google.dev/aistudio)
2. Click on the **Get API Key** button. This will create an api key and new project id for you.

#### Important
If you use Gemini API from a project that has billing enabled, your use will be subject to [pay-as-you-go](https://ai.google.dev/pricing?_gl=1*czahyb*_ga*Nzk0MjIzOTI2LjE3MTc1MDczNDc.*_ga_P1DBVKWT6V*MTcxNzUzMzI4Ny4zLjEuMTcxNzUzNTI2NS42MC4wLjE0Njc2OTIxOTI.) pricing. 

## Installation

#### Contributor

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
#### Personal Use

| Windows      | MacOS    |
| :------------ | :------------ |
| [AlixCLI-Win-Installer-V1.0.bat](https://raw.githubusercontent.com/alexlogorz/alix-cli/main/AlixCLI-Win-Installer-V1.0.bat) | Coming soon |

## Usage
Show a list of available commands, options and version info.
``` bash
alix help
```

Sets your api key. This is needed for commands that us generative ai.
``` bash
alix set "your api key here"
```
Gets the products title. More options can be specified.
``` bash
alix get --title "link to product here"
```
Deletes all the images from the product_images folder.
``` bash
alix clean
```

**Important**
1. Your api key and product links must be enclosed in double quotation marks.
2. This tool has only been tested on https://aliexpress.us

## Support
If you need assistance regarding this tool, please reach me at alogorzmedia@gmail.com
