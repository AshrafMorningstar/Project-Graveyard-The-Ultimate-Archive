
@echo off
cd /d "c:\Users\Admin\Documents\GitHub\New Projects\text files projects\2\cyber-statics-standard"
call npm install
git init
git add .
git commit -m "Initial commit: Cyber Statics Standard Version"
git branch -M main
git remote add origin https://AshrafMorningstar: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@github.com/AshrafMorningstar/cyber-statics-standard.git
git push -u origin main
