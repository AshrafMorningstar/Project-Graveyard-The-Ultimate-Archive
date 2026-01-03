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
 * Cooking Mode Component
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';

export function CookingMode({ recipe, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);

  const progress = ((currentStep + 1) / recipe.steps.length) * 100;

  return (
    <div className="cooking-mode">
      <header className="cooking-header">
        <div>
          <h3>{recipe.title}</h3>
          <div style={{ 
            height: '4px', 
            width: '200px', 
            background: '#eee', 
            marginTop: '8px', 
            borderRadius: '2px', 
            overflow: 'hidden' 
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: '#2D6A4F',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
        <button className="close-btn" onClick={onClose}>
          <X size={20} /> Exit Cooking Mode
        </button>
      </header>

      <div className="step-container">
        <div className="step-content">
          <h2>Step {currentStep + 1} of {recipe.steps.length}</h2>
          <p className="step-instruction">{recipe.steps[currentStep]}</p>
        </div>
      </div>

      <footer className="cooking-footer">
        <button 
          className="nav-btn" 
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(c => c - 1)}
        >
          <ChevronLeft /> Previous
        </button>
        
        {currentStep === recipe.steps.length - 1 ? (
          <button className="nav-btn" style={{ background: '#2D6A4F' }} onClick={onClose}>
            <Check /> Finish Cooking
          </button>
        ) : (
          <button 
            className="nav-btn"
            onClick={() => setCurrentStep(c => c + 1)}
          >
            Next <ChevronRight />
          </button>
        )}
      </footer>
    </div>
  );
}
