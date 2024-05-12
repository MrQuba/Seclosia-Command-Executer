@echo off
cd src
start /WAIT tsc
if %errorlevel% equ 0 (
    echo TypeScript compilation successful.
    .\start.bat
) else (
    echo TypeScript compilation failed.
)
cd ..
exit /b %errorlevel%