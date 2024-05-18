@echo off
REM Set the repository path
cd ..

REM Check if the directory is a Git repository
IF NOT EXIST .git (
    echo The directory is not a valid Git repository.
    pause
    exit /b 1
)

REM Fetch the latest changes from the remote repository
echo Fetching latest changes from the remote repository...
git fetch origin

REM Check the current branch
FOR /F "tokens=2 delims= " %%i IN ('git symbolic-ref --short HEAD') DO SET CURRENT_BRANCH=%%i

REM Pull the latest changes
echo Pulling latest changes for branch %CURRENT_BRANCH%...
git pull origin %CURRENT_BRANCH%

REM Check if the pull was successful
IF %ERRORLEVEL% NEQ 0 (
    echo Failed to update the repository. Please check for errors.
    pause
    exit /b 1
)

echo Repository updated successfully.
pause
