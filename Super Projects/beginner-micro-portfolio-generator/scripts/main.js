/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Main Application Logic
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class PortfolioGenerator {
    constructor() {
        this.state = {
            fullName: '',
            tagline: '',
            bio: '',
            email: '',
            github: '',
            linkedin: '',
            avatar: null,
            skills: [],
            template: 'clean',
            sectionOrder: ['about', 'skills', 'contact']
        };
        
        this.init();
    }

    init() {
        this.bindFormEvents();
        this.bindTemplateSelector();
        this.bindDragAndDrop();
        this.bindExportButton();
        this.updatePreview();
    }

    bindFormEvents() {
        // Text inputs
        ['fullName', 'tagline', 'bio', 'email', 'github', 'linkedin'].forEach(field => {
            const input = document.getElementById(field);
            if (input) {
                input.addEventListener('input', (e) => {
                    this.state[field] = e.target.value;
                    this.updatePreview();
                });
            }
        });

        // Skills input
        const skillsInput = document.getElementById('skills');
        if (skillsInput) {
            skillsInput.addEventListener('input', (e) => {
                this.state.skills = e.target.value
                    .split(',')
                    .map(s => s.trim())
                    .filter(s => s.length > 0);
                this.updatePreview();
            });
        }

        // Avatar upload
        const avatarInput = document.getElementById('avatar');
        if (avatarInput) {
            avatarInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        this.state.avatar = event.target.result;
                        this.updatePreview();
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }

    bindTemplateSelector() {
        const templateButtons = document.querySelectorAll('.template-btn');
        templateButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                templateButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.state.template = e.target.dataset.template;
                this.updatePreview();
            });
        });
    }

    bindDragAndDrop() {
        const sectionOrder = document.getElementById('sectionOrder');
        let draggedElement = null;

        sectionOrder.addEventListener('dragstart', (e) => {
            draggedElement = e.target;
            e.target.classList.add('dragging');
        });

        sectionOrder.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
        });

        sectionOrder.addEventListener('dragover', (e) => {
            e.preventDefault();
            const afterElement = this.getDragAfterElement(sectionOrder, e.clientY);
            if (afterElement == null) {
                sectionOrder.appendChild(draggedElement);
            } else {
                sectionOrder.insertBefore(draggedElement, afterElement);
            }
        });

        sectionOrder.addEventListener('drop', (e) => {
            e.preventDefault();
            this.updateSectionOrder();
            this.updatePreview();
        });
    }

    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.section-item:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    updateSectionOrder() {
        const sections = document.querySelectorAll('.section-item');
        this.state.sectionOrder = Array.from(sections).map(s => s.dataset.section);
    }

    bindExportButton() {
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportPortfolio();
            });
        }
    }

    updatePreview() {
        const preview = document.getElementById('preview');
        if (!preview) return;

        const templateFunction = templates[this.state.template];
        if (templateFunction) {
            const html = templateFunction(this.state);
            
            // Create iframe for isolated preview
            preview.innerHTML = '';
            const iframe = document.createElement('iframe');
            iframe.style.width = '100%';
            iframe.style.height = '600px';
            iframe.style.border = 'none';
            iframe.style.borderRadius = '8px';
            
            preview.appendChild(iframe);
            
            // Write content to iframe
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            iframeDoc.open();
            iframeDoc.write(html);
            iframeDoc.close();
        }
    }

    async exportPortfolio() {
        const templateFunction = templates[this.state.template];
        if (!templateFunction) {
            alert('Please select a template');
            return;
        }

        const html = templateFunction(this.state);
        
        // Show loading state
        const exportBtn = document.getElementById('exportBtn');
        const originalText = exportBtn.innerHTML;
        exportBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg> Exporting...';
        exportBtn.disabled = true;

        try {
            await exporter.exportPortfolio(html, this.state);
            
            // Success feedback
            exportBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Exported!';
            
            setTimeout(() => {
                exportBtn.innerHTML = originalText;
                exportBtn.disabled = false;
            }, 2000);
        } catch (error) {
            console.error('Export failed:', error);
            exportBtn.innerHTML = originalText;
            exportBtn.disabled = false;
            alert('Export failed. Please try again.');
        }
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PortfolioGenerator();
    });
} else {
    new PortfolioGenerator();
}
