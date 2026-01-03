/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# ========================================
# Create ZIP Files for All Projects
# Created by: AshrafMorningstar
# ========================================

Write-Host "Creating ZIP files for all projects..." -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$baseDir = "c:\Users\Admin\Documents\GitHub\New Projects\text files projects\4"
$outputDir = Join-Path $baseDir "Project_ZIPs"

# Create output directory
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
}

$projects = @(
    "Titan_Reality_Weaver",
    "NeuroForge_OS",
    "Quantum_Nexus",
    "BlockWeaveX",
    "SynapseFlow_Studio",
    "HoloCommerce",
    "ChronicleNet",
    "Aurora_Meta_Kernel",
    "Quantic_Orbit_Fabric",
    "Prism_Chains",
    "Voidscape_Engine",
    "Omega_Forge",
    "Nebula_Neural_Grid",
    "Astral_Code_Compiler"
)

foreach ($project in $projects) {
    $projectPath = Join-Path $baseDir $project
    
    if (Test-Path $projectPath) {
        $zipPath = Join-Path $outputDir "$project.zip"
        Write-Host "Creating ZIP: $project.zip" -ForegroundColor Yellow
        
        Compress-Archive -Path "$projectPath\*" -DestinationPath $zipPath -Force
        
        Write-Host "   Created: $zipPath" -ForegroundColor Green
    } else {
        Write-Host "   Project not found: $project" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "All ZIP files created!" -ForegroundColor Green
Write-Host "Location: $outputDir" -ForegroundColor Blue
Write-Host "========================================" -ForegroundColor Cyan

# Open the output directory
explorer $outputDir
