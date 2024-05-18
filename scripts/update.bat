@echo off
REM Set the repository directory path
cd ..
REM fetch
git fetch origin

REM Check for new commits
setlocal enabledelayedexpansion
for /f "tokens=1 delims=" %%a in ('git rev-list HEAD...origin/main --count') do set COUNT=%%a
endlocal

if %COUNT% GTR 0 (
    echo New commits detected. Updating repository...
    
    REM Pull the latest changes
    git pull origin main
    
    if %ERRORLEVEL% NEQ 0 (
        echo Error occurred during git pull. Exiting...
        exit /b 1
    )
    
    echo Repository updated successfully.
) else (
    echo No new commits. Repository is up-to-date.
)

exit /b 0