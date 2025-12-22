@echo off
echo ===================================================
echo   Web Dev Roadmap - Universal Installer
echo   Author: Ashraf Morningstar
echo ===================================================
echo.

echo [1/5] Installing Dependencies for AI Summarizer (Python)...
cd 02-intermediate\01-ai-summarizer
echo Creating wrapper requirements.txt...
echo flask > requirements.txt
echo flask-cors >> requirements.txt
pip install -r requirements.txt
cd ..\..
echo Done.
echo.

echo [2/5] Installing Dependencies for Booking System (Node)...
cd 02-intermediate\02-booking-system
call npm init -y > nul
call npm install express cors
cd ..\..
echo Done.
echo.

echo [3/5] Installing Dependencies for Whiteboard (Node)...
cd 02-intermediate\06-whiteboard
call npm init -y > nul
call npm install express socket.io
cd ..\..
echo Done.
echo.

echo [4/5] Installing Dependencies for Coding Arena (Node)...
cd 03-advanced\05-coding-arena
call npm init -y > nul
call npm install express socket.io vm2
cd ..\..
echo Done.
echo.

echo [5/5] Optional: Blockchain Dependencies...
echo For '01-decentralized-blog', please install MetaMask in your browser.
echo.

echo ===================================================
echo   All Dependencies Installed! 
echo   You are ready to run the Full Stack projects.
echo ===================================================
pause
