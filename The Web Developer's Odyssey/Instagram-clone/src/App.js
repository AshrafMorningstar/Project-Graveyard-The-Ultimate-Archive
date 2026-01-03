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

import Navbar from "../src/Components/Navbar"
import Story from "../src/Components/Story"
import SideBox from "./Components/SideBox"
import Post from "./Components/Posts"
const App = ()=>{
    return(
        <>
        <Navbar/>
        <div className="main_container">
        <div className="page_content">
        <div className="main_content">
         <Story/>
         <Post/>
         <Post/>
         <Post/>
         <Post/>
         <Post/>
         <Post/>
         <Post/>
         <Post/>
        </div>
        <SideBox/>
        </div>
        </div>
        </>
    )
   
}

export default App;
