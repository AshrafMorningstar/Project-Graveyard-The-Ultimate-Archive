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
 * Maintainer: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

import Loader from "react-loader-spinner";
import './styles.css';

const LoaderComp = ()=>{
    return(
  <>
        <div className='app'>
            <Loader
            type="Puff"
            color="rgb(255,255,255)"
            height={200}
            width={480}
            timeout={2000}
            />
       </div>
            <footer className='copyapp' >Copyright &copy;Developed by Abhishek Tyagi</footer>
   </>
    );
}
export default LoaderComp