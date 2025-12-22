/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Portfolio Exporter Utility
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

export class Exporter {
    constructor(app) {
        this.app = app;
    }

    exportPortfolio() {
        const { selectedTemplate } = this.app.state;
        const template = this.app.preview.templates[selectedTemplate];
        const html = this.generateHTML(template.render(this.app.state));
        
        this.downloadFile(html, 'portfolio.html', 'text/html');
    }

    generateHTML(content) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${this.app.state.bio || 'Professional Portfolio'}">
    <meta name="author" content="${this.app.state.fullName || 'Portfolio Owner'}">
    <title>${this.app.state.fullName || 'Portfolio'} - ${this.app.state.title || 'Professional'}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Inter', sans-serif;
            background: #f5f5f5;
            padding: 40px 20px;
        }
    </style>
</head>
<body>
    ${content}
    <footer style="text-align: center; margin-top: 60px; padding: 20px; color: #666; font-size: 14px;">
        <p>Created with Micro Portfolio Generator</p>
        <p>By <a href="https://github.com/AshrafMorningstar" style="color: #3B82F6; text-decoration: none;">Ashraf Morningstar</a></p>
    </footer>
</body>
</html>`;
    }

    downloadFile(content, filename, type) {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}
