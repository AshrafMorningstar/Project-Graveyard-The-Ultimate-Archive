/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

// Created by Ashraf Morningstar - https://github.com/AshrafMorningstar
let startTime=0,elapsedTime=0,timerInterval,running=false,lapCounter=0;const display=document.getElementById('display'),startBtn=document.getElementById('start-btn'),pauseBtn=document.getElementById('pause-btn'),resetBtn=document.getElementById('reset-btn'),lapsContainer=document.getElementById('laps');function start(){if(!running){startTime=Date.now()-elapsedTime;timerInterval=setInterval(updateTime,10);running=true;startBtn.disabled=true;pauseBtn.disabled=false;startBtn.textContent='Lap';startBtn.onclick=recordLap}}function pause(){if(running){clearInterval(timerInterval);running=false;startBtn.disabled=false;pauseBtn.disabled=true;startBtn.textContent='Resume';startBtn.onclick=start}}function reset(){clearInterval(timerInterval);running=false;startTime=0;elapsedTime=0;lapCounter=0;display.textContent='00:00:00.00';lapsContainer.innerHTML='';startBtn.disabled=false;pauseBtn.disabled=true;startBtn.textContent='Start';startBtn.onclick=start}function updateTime(){elapsedTime=Date.now()-startTime;let milliseconds=Math.floor((elapsedTime%1000)/10),seconds=Math.floor((elapsedTime/1000)%60),minutes=Math.floor((elapsedTime/(1000*60))%60),hours=Math.floor(elapsedTime/(1000*60*60));display.textContent=`${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`}function pad(num){return num<10?'0'+num:num}function recordLap(){if(!running)return;lapCounter++;const lapTime=display.textContent,lapItem=document.createElement('div');lapItem.className='lap-item';lapItem.innerHTML=`<span>Lap ${lapCounter}</span><span>${lapTime}</span>`;lapsContainer.insertBefore(lapItem,lapsContainer.firstChild)}startBtn.addEventListener('click',start);pauseBtn.addEventListener('click',pause);resetBtn.addEventListener('click',reset);
