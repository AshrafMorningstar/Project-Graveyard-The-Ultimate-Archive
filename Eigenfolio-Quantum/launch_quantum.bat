@echo off
echo 🌌 Initializing Eigenfolio Quantum Launch Sequence...

:: 1. Initialize Git
echo 📦 Initializing Git Repository...
git init
git add .
git commit -m "🚀 Launch: Eigenfolio Quantum v1.0.0 - The Neural OS"

:: 2. Install Dependencies (if possible)
echo 🔧 Installing Quantum Dependencies...
call npm install

:: 3. Build Project
echo 🏗️ Compiling Neural Architecture...
call npm run build

:: 4. Launch Instructions
echo.
echo ========================================================
echo 🚀 EIGENFOLIO QUANTUM IS READY FOR LAUNCH! 🚀
echo ========================================================
echo.
echo To upload to GitHub:
echo 1. Create a repository named "Eigenfolio-Quantum" on GitHub.
echo 2. Run the following commands:
echo    git remote add origin https://github.com/AshrafMorningstar/Eigenfolio-Quantum.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo To deploy to Vercel:
echo 1. Install Vercel CLI: npm i -g vercel
echo 2. Run: vercel deploy --prod
echo.
echo ========================================================
pause
