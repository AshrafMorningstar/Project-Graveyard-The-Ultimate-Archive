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

const container = document.querySelector('.container')
const text = document.querySelector('#text')

const totaltime = 7500
const breathetime = (totaltime / 5) * 2
const holdtime = totaltime / 5

breatheanimation()

function breatheanimation(){
    text.innerHTML= 'Breathe-In !'
    container.className='container grow'

    setTimeout(() => {
        text.innerText= 'Hold' 
        setTimeout(()=>{
            text.innerText= 'Breathe-Out !'
            container.className='container shrink'
        },holdtime)
    },breathetime)
}

setInterval(breatheanimation,totaltime)

