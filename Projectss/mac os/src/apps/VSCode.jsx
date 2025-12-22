/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';

const VSCode = () => {
    return (
        <div className="h-full w-full bg-[#1e1e1e]">
            {/* We can use an embed or just a mock image if iframes are blocked. vscode.dev works well usually but might be heavy. 
                Let's use a specialized online editor embed or just text area for simplicity and performance locally?
                Better: github1s or similar, or just a very good looking mock UI.
                For "33 features", a functioning code editor is nice.
            */}
             <iframe 
                src="https://github1s.com/AshrafMorningstar/macos-portfolio" 
                className="w-full h-full border-none"
                title="VS Code"
             />
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 text-white">
                 Loading VS Code Environment...
             </div>
        </div>
    );
};

export default VSCode;
