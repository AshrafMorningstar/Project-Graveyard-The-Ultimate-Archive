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
 * @file WindowManager.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 LMSFolio Quantum - The Future of Learning
 * "The future is unwritten, but the code is compiled."
 */

import React from 'react';
import { useSystemStore } from '../store';
import Window from './Window';

const WindowManager: React.FC<{ 
    components: Record<string, React.FC<any>> 
}> = ({ components }) => {
    const { windows } = useSystemStore();

    return (
        <div className="absolute inset-0 z-10 pointer-events-none">
            {windows.map(win => {
                const Component = components[win.appId];
                if (!Component) return null;
                
                return (
                    <div key={win.id} className="pointer-events-auto">
                        <Window win={win}>
                            <Component {...(win.data || {})} />
                        </Window>
                    </div>
                );
            })}
        </div>
    );
};

export default WindowManager;