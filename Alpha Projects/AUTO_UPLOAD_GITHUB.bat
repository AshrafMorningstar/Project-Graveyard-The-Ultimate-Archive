@echo off
title QUANTUM WEB ROADMAP | FULL AUTO DEPLOY SYSTEM
color 0b
cls

echo ========================================================
echo   QUANTUM WEB ROADMAP | ZERO-TOUCH LAUNCHER
echo   Powered by: Ashraf Morningstar
echo ========================================================
echo.

echo [1/6] 🧬 Injecting Viral Identity & SEO...
call node inject_identity.js

echo.
echo [2/6] 📦 Packaging Quantum Repository...
cd Quantum-Web-Roadmap
git init
git branch -M main
git add .
git commit -m "🚀 Premium Launch: 18 Quantum Web Projects (Completed) | Zero-Dependency"

echo.
echo [3/6] 🌐 Synchronizing with GitHub...
:: Try to create, ignore error if exists
call gh repo create "Quantum-Web-Roadmap" --public --source=. --remote=origin --push --description "🚀 18 Revolutionary Web Projects (Beginner to Expert). Zero Dependencies. Pure HTML/JS/CSS. Explore 3D Holographic UIs, Quantum Simulations, and AI-Driven Interfaces. #WebDev #FutureTech" >nul 2>&1

:: Force link and push if create failed (repo exists)
git remote add origin https://github.com/AshrafMorningstar/Quantum-Web-Roadmap.git >nul 2>&1
git push -u origin main

echo.
echo [4/6] 🎨 Configuring Premium Metadata...
call gh repo edit --homepage "https://ashrafmorningstar.github.io/Quantum-Web-Roadmap/" --enable-issues --enable-wiki

echo.
echo [5/6] 🚀 Activating GitHub Pages...
:: Use API to enable pages directly
call gh api repos/AshrafMorningstar/Quantum-Web-Roadmap/pages -F "source[branch]=main" -F "source[path]=/" >nul 2>&1

echo.
echo [6/6] ✨ Launching Experience...
color 0a
echo.
echo ========================================================
echo   MISSION ACCOMPLISHED.
echo   Repository: https://github.com/AshrafMorningstar/Quantum-Web-Roadmap
echo   Live Site:  https://ashrafmorningstar.github.io/Quantum-Web-Roadmap/
echo ========================================================

:: Open links automatically
start https://github.com/AshrafMorningstar/Quantum-Web-Roadmap
start https://ashrafmorningstar.github.io/Quantum-Web-Roadmap/

echo.
echo Press any key to exit mission control.
pause
exit
