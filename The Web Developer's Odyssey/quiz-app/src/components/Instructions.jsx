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

import React from 'react';

const Instructions = ({startQuiz}) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white text-indigo-600">
            <h2 className="text-4xl font-bold mb-4">Quiz Instructions</h2>
            <ul className="text-lg mb-6">
                <li className="mb-2">1. Read each question carefully.</li>
                <li className="mb-2">2. Select the best answer from the given options.</li>
                <li className="mb-2">3. You can skip questions and return to them later.</li>
                <li className="mb-2">4. Submit the quiz once you have answered all questions.</li>
            </ul>
            <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg" onClick={startQuiz}>
                Start Quiz
            </button>
        </div>
    );
};

export default Instructions;