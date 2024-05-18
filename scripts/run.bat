@echo off
cd ..
cd src
echo Compiling project...
call tsc
echo Compilation complete.
cd ..
.\scripts\start.bat
pause