@echo off

net session >nul 2>&1

if %errorlevel% neq 0 (
    echo This script requires administrative privileges. Please exit, right click the installer and "Run as Administrator".
    pause
    exit
) 

echo Checking node version...

node --version >nul 2>&1

REM Admin privileges was needed for Node installation here. Now we can install.
if %errorlevel% neq 0 (
    echo Node is not installed. Installing...
    curl -o node-v20.14.0-x64.msi https://nodejs.org/dist/v20.14.0/node-v20.14.0-x64.msi
    msiexec /i node-v20.14.0-x64.msi /quiet /qn /norestart
    echo Node installation completed.
    del node-v20.14.0-x64.msi
) else (
    echo Node is already installed. Skipping installation...
)

set "INSTALL_DIR=%USERPROFILE%"

if not exist "%INSTALL_DIR%\alix-cli-main" (
    echo Installing alix-cli-main...

    curl -o alix-cli-main.zip -L https://github.com/alexlogorz/alix-cli/archive/main.zip

    powershell -Command "Expand-Archive -Path .\alix-cli-main.zip -DestinationPath \"%INSTALL_DIR%\""

    del alix-cli-main.zip
	
    echo Navigating to alix-cli...

    cd /d "%INSTALL_DIR%\alix-cli-main"

    echo Installing dependencies...

    call npm install

    echo Running build script...

    call npm run build

    echo Installing the package globally...

    call npm install -g .	

    echo Alix CLI has been installed. Type alix help for more info.
) else (
    echo alix-cli-main is already installed. Skipping installation.
)

cmd /k
