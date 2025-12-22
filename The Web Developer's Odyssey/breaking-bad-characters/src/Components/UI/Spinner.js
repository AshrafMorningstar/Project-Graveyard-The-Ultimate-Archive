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

import React from 'react'
import spinner from '../../img/spinner.gif'

const Spinner = () => {
    return (
        <img 
            src={spinner} 
            style={ {width:'200px', margin: 'auto', display: "block" } }
            alt ="Loading"
            />
    )
}

export default Spinner
