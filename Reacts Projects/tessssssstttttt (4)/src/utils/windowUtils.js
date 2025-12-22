/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

export const calculateInitialPosition = (windowCount, offset = 30, startX = 100, startY = 100) => {
    return {
        x: startX + (windowCount * offset),
        y: startY + (windowCount * offset)
    };
};

export const clampPosition = (x, y, maxWidth, maxHeight, windowWidth, windowHeight) => {
    return {
        x: Math.max(0, Math.min(x, maxWidth - windowWidth)),
        y: Math.max(0, Math.min(y, maxHeight - windowHeight))
    };
};
