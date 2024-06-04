# Alix CLI

This is a CLI tool developed in NodeJS. Its purpose is to extract product data, such as titles, images and more from AliExpress.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)

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
4. Install the package globally. This will allow you to use the cli from anywhere.
   ```bash
    npm install -g .
   ```

## Usage
Open a terminal and type the following for a list of available commands and version info.
``` bash
alix help
```

**Important**: Double quotation marks must enclose the products link.

Example usage
``` bash
alix -t "link to aliexpress product"
```
This will extract the title from the AliExpress product.

## Support
If you need assistance regarding this tool, please reach me at alogorzmedia@gmail.com