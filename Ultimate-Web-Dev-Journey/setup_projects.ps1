/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

$projects = @(
    "Snake-Game", "Memory-Card-Game", "Rock-Paper-Scissors", "Simon-Game", "Whack-a-Mole", 
    "Digital-Clock", "Password-Generator", "QR-Code-Generator", "Expense-Tracker", "Age-Calculator", 
    "Quote-Generator", "Movie-Search-App", "Currency-Converter", "Recipe-Finder", 
    "Analog-Clock", "Responsive-Navbar", "Glassmorphism-Login", "Image-Slider", "Dark-Mode-Toggle", "Form-Validation", 
    "Netflix-Clone", "Spotify-Clone", "YouTube-Clone", "Portfolio-Website", "Landing-Page", 
    "E-commerce-Site", "Chat-App", "Quiz-App", "Music-Player", "Draggable-Div", 
    "Drawing-App", "Text-to-Speech", "Speech-to-Text", "Typing-Speed-Test", "Notes-App",
    "Product-Card", "Testimonial-Box", "Vertical-Timeline", "Scroll-Animation", "Loader-Animation"
)

foreach ($proj in $projects) {
    if (-not (Test-Path "$proj")) {
        New-Item -ItemType Directory -Force -Path "$proj" | Out-Null
        $readmeContent = "# $proj`n`nComing Soon! This project is currently under development as part of the Ultimate Web Dev Journey.`n`n## 🛠️ Tech Stack`n- HTML, CSS, JS`n`n---`n**Created by [Ashraf Morningstar](https://github.com/AshrafMorningstar)**"
        Set-Content -Path "$proj/README.md" -Value $readmeContent
        
        # Create empty placeholder files so it looks real
        New-Item -ItemType File -Force -Path "$proj/index.html" | Out-Null
        New-Item -ItemType File -Force -Path "$proj/style.css" | Out-Null
        New-Item -ItemType File -Force -Path "$proj/script.js" | Out-Null
    }
}
