/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Form Panel Component
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

export class FormPanel {
    constructor(app) {
        this.app = app;
        this.projectCount = 1;
    }

    init() {
        this.setupFormListeners();
        this.setupTemplateSelector();
        this.setupProjectManager();
    }

    setupFormListeners() {
        const form = document.getElementById('portfolioForm');
        
        // Text inputs
        ['fullName', 'title', 'bio', 'email', 'github', 'linkedin', 'website'].forEach(field => {
            const input = document.getElementById(field);
            if (input) {
                input.addEventListener('input', (e) => {
                    this.app.updateState({ [field]: e.target.value });
                });
            }
        });

        // Skills input
        const skillsInput = document.getElementById('skills');
        skillsInput.addEventListener('input', (e) => {
            const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
            this.app.updateState({ skills });
        });

        // Avatar upload
        const avatarInput = document.getElementById('avatar');
        avatarInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.app.updateState({ avatar: event.target.result });
                };
                reader.readAsDataURL(file);
            }
        });
    }

    setupTemplateSelector() {
        const templates = document.querySelectorAll('.template-option');
        templates.forEach(template => {
            template.addEventListener('click', () => {
                templates.forEach(t => t.classList.remove('active'));
                template.classList.add('active');
                const selectedTemplate = template.dataset.template;
                this.app.updateState({ selectedTemplate });
            });
        });
    }

    setupProjectManager() {
        const addProjectBtn = document.getElementById('addProjectBtn');
        const projectsContainer = document.getElementById('projectsContainer');

        addProjectBtn.addEventListener('click', () => {
            this.addProjectField();
        });

        // Listen to initial project inputs
        this.updateProjectListeners();
    }

    addProjectField() {
        const projectsContainer = document.getElementById('projectsContainer');
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.dataset.index = this.projectCount;
        projectItem.innerHTML = `
            <input type="text" placeholder="Project Name" class="project-name">
            <textarea placeholder="Project Description" class="project-desc" rows="2"></textarea>
            <input type="url" placeholder="Project URL" class="project-url">
            <button type="button" class="btn-secondary remove-project">Remove</button>
        `;
        projectsContainer.appendChild(projectItem);
        this.projectCount++;
        this.updateProjectListeners();
    }

    updateProjectListeners() {
        const projectItems = document.querySelectorAll('.project-item');
        
        projectItems.forEach((item, index) => {
            const nameInput = item.querySelector('.project-name');
            const descInput = item.querySelector('.project-desc');
            const urlInput = item.querySelector('.project-url');
            const removeBtn = item.querySelector('.remove-project');

            const updateProjects = () => {
                const projects = Array.from(document.querySelectorAll('.project-item')).map(project => ({
                    name: project.querySelector('.project-name').value,
                    description: project.querySelector('.project-desc').value,
                    url: project.querySelector('.project-url').value
                })).filter(p => p.name || p.description);

                this.app.updateState({ projects });
            };

            nameInput.addEventListener('input', updateProjects);
            descInput.addEventListener('input', updateProjects);
            urlInput.addEventListener('input', updateProjects);

            if (removeBtn) {
                removeBtn.addEventListener('click', () => {
                    item.remove();
                    updateProjects();
                });
            }
        });
    }
}
