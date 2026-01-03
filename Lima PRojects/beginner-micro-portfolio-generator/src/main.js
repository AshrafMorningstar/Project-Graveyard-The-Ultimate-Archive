/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Micro Portfolio Generator - Main Application
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

import { FormPanel } from './components/FormPanel.js';
import { Preview } from './components/Preview.js';
import { Exporter } from './utils/exporter.js';

class PortfolioGenerator {
    constructor() {
        this.state = {
            fullName: '',
            title: '',
            bio: '',
            avatar: null,
            email: '',
            github: '',
            linkedin: '',
            website: '',
            skills: [],
            projects: [],
            selectedTemplate: 'clean'
        };

        this.formPanel = new FormPanel(this);
        this.preview = new Preview(this);
        this.exporter = new Exporter(this);

        this.init();
    }

    init() {
        this.formPanel.init();
        this.preview.init();
        this.setupEventListeners();
        this.updatePreview();
    }

    setupEventListeners() {
        // Export button
        const exportBtn = document.getElementById('exportBtn');
        const exportModal = document.getElementById('exportModal');
        const cancelExportBtn = document.getElementById('cancelExportBtn');
        const confirmExportBtn = document.getElementById('confirmExportBtn');

        exportBtn.addEventListener('click', () => {
            exportModal.classList.add('active');
        });

        cancelExportBtn.addEventListener('click', () => {
            exportModal.classList.remove('active');
        });

        confirmExportBtn.addEventListener('click', () => {
            this.exporter.exportPortfolio();
            exportModal.classList.remove('active');
        });

        // Reset button
        const resetBtn = document.getElementById('resetBtn');
        resetBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all fields?')) {
                this.resetForm();
            }
        });
    }

    updateState(updates) {
        this.state = { ...this.state, ...updates };
        this.updatePreview();
    }

    updatePreview() {
        this.preview.render();
    }

    resetForm() {
        document.getElementById('portfolioForm').reset();
        this.state = {
            fullName: '',
            title: '',
            bio: '',
            avatar: null,
            email: '',
            github: '',
            linkedin: '',
            website: '',
            skills: [],
            projects: [],
            selectedTemplate: 'clean'
        };
        this.updatePreview();
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioGenerator();
});
