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

import React,{useState} from "react";
import "./style.css";

const App = ()=>{
    const [count, setCount]= useState(0);
return(
    <div>
    <h1>COUNTER APP</h1> 
    <h3>The value of counter is {count}</h3> 
<button onClick={()=>count<25 ? setCount(count+1) : "" }>Increament</button>
<button onClick={()=>count>0 ? setCount (count-1) : ""}>Decreament</button>
<button onClick={()=>{ setCount(0)}}>Reset</button>
</div>
)
 
}

export default App;