/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Preview Component
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

import { CleanTemplate } from "../templates/clean.js";
import { NeonTemplate } from "../templates/neon.js";
import { GlassmorphismTemplate } from "../templates/glassmorphism.js";

export class Preview {
  constructor(app) {
    this.app = app;
    this.container = document.getElementById("previewContainer");
    this.templates = {
      clean: new CleanTemplate(),
      neon: new NeonTemplate(),
      glassmorphism: new GlassmorphismTemplate(),
    };
  }

  init() {
    this.render();
  }

  render() {
    const { selectedTemplate } = this.app.state;
    const template = this.templates[selectedTemplate];

    if (template) {
      this.container.innerHTML = template.render(this.app.state);
    }
  }
}
