/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/


@echo off
cd /d "c:\Users\Admin\Documents\GitHub\New Projects\text files projects\2\cyber-statics-ultra"
call npm install
git init
git add .
git commit -m "Initial commit: Cyber Statics Ultra Version"
git branch -M main
git remote add origin https://AshrafMorningstar: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@github.com/AshrafMorningstar/cyber-statics-ultra.git
git push -u origin main
