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

import './style.css'
import image from "../images/neerajchopra.webp";
import SideBoxImage from "./SideBoxImage"

const SideBox = ()=>{
    return(
        <>
        <div className="sideBox">
            <div>
            <img src={image}  className="sideBox_main_image" alt=""></img>
         <div>
         <h3>Jugesh Raghav</h3>
         <p>jugesh_raghav</p>
         </div>
            </div>
            <h3>Suggestions For You</h3>
            <SideBoxImage/>
         <SideBoxImage/>
         <SideBoxImage/>
         <SideBoxImage/>
         <SideBoxImage/>
         <SideBoxImage/>
        </div>
        </>
    )
}

export default SideBox