@echo off

:: Initializing script variables.

set "NODE_VERSION=20.14.0"
set "NODE_INSTALL_DIR=C:\Program Files\nodejs"
set "ALIX_INSTALL_DIR=%USERPROFILE%"
set "NPM_GLOBAL_DIR=%USERPROFILE%\AppData\Roaming\npm"

:: Checking for admin privileges.

net session >null 2>&1

if %errorlevel% neq 0 (
	echo Admin privileges are required in order to proceed. Please exit, right-click and "Run as Administrator".
	del null
	cmd /k
)

:: Checking if Node Js is installed.

echo Checking for Node Js...

node --version >null 2>&1

if %errorlevel% neq 0 (
   	echo Node Js is not installed. Installing...
   
	curl -o node-v%NODE_VERSION%-x64.msi https://nodejs.org/dist/v%NODE_VERSION%/node-v%NODE_VERSION%-x64.msi
	msiexec /i node-v%NODE_VERSION%-x64.msi /quiet /qn /norestart
	del node-v%NODE_VERSION%-x64.msi
	
	echo Node installation completed.

	:: Refresh for future session.
   	setx PATH "%PATH%;%NODE_INSTALL_DIR%" /M
    	
    	:: Refresh for current session.
    	set "PATH=%PATH%;%NODE_INSTALL_DIR%"

) else (
	echo Node Js is already installed...
)

if not exist "%ALIX_INSTALL_DIR%\alix-cli-main" (
	echo Installing Alix...

	:: Downloading the zip file
	curl -o alix-cli-main.zip -L https://github.com/alexlogorz/alix-cli/archive/main.zip

	:: Extracting the zip file using tar
	tar -xf alix-cli-main.zip -C "%ALIX_INSTALL_DIR%"

	:: Deleting the zip file
	del alix-cli-main.zip

	echo Extraction completed... Navigating to alix-cli-main.
	
	cd /d "%ALIX_INSTALL_DIR%\alix-cli-main"

	echo Installing dependencies...
	
	call npm install

	echo Building package...

	call npm run build

	echo Installing the package globally...

	call npm install -g .

	:: Refresh for future session.
   	setx PATH "%PATH%;%NPM_GLOBAL_DIR%" /M
    	
    	:: Refresh for current session.
    	set "PATH=%PATH%;%NPM_GLOBAL_DIR%"

) else (
	echo Alix is already installed...
)

cmd /k "alix help"