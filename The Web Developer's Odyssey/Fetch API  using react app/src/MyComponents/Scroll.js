/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Maintainer: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

import React from 'react';

const Scroll = (props) => {
    return(
        <div style={{overflowY: 'scroll', border: '1px solid black', height: '1200px'}}>
            {props.children}
        </div>
    )
};

export default Scroll;