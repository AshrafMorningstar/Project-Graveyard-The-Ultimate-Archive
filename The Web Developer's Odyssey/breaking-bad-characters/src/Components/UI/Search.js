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

import React , {useState} from 'react'

const Search = ( {getQuery} ) => {


    const [text, setText] = useState('')
    const onChange = (q) =>{
        setText(q)
        getQuery(q)
    }
    return (
        <section className="search">
            <form>
                <input 
                  type="text" 
                  className="from-control" 
                  placeholder="Search Characters"
                  value = {text}  
                  onChange = { (e) => 
                      onChange(e.target.value)
                  }
                  autoFocus/>
            </form>
        </section>
    )
}

export default Search
