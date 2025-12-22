/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import useWindowStore from '../../stores/windowStore';
import Window from '../Windows/Window';

const Desktop = () => {
    const { windows, zIndices } = useWindowStore();

    return (
        <div className="relative w-full h-full pt-8 pb-20">
            {Object.values(windows).map((window) => (
                <Window
                    key={window.id}
                    {...window}
                    zIndex={zIndices[window.id]}
                />
            ))}
        </div>
    );
};

export default Desktop;
