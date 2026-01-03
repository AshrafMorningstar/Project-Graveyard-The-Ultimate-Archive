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
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Project: Interactive Algorithm Visualizer
 */

import React, { useState, useEffect } from 'react';

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);

    useEffect(() => {
        resetArray();
    }, []);

    const resetArray = () => {
        const arr = [];
        for (let i = 0; i < 100; i++) {
            arr.push(Math.floor(Math.random() * 500) + 5);
        }
        setArray(arr);
    };

    const bubbleSort = async () => {
        // Implementation of animated bubble sort
        // Would use setTimeout or requestAnimationFrame for visual delays
        console.log("Sorting...");
        const arr = [...array];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    
                    // Update state to trigger re-render (naive approach)
                    setArray([...arr]);
                    // await sleep(10); // Custom sleep function
                }
            }
        }
    };

    return (
        <div className="visualizer-container">
            <header>
                <h1>Algorithm Visualizer</h1>
                <p>By Ashraf Morningstar</p>
            </header>
            
            <div className="array-container">
                {array.map((value, idx) => (
                    <div 
                        className="array-bar" 
                        key={idx}
                        style={{height: `${value}px`, backgroundColor: '#ff9a9e'}}
                    ></div>
                ))}
            </div>

            <div className="controls">
                <button onClick={resetArray}>Generate New Array</button>
                <button onClick={bubbleSort}>Bubble Sort</button>
                <button>Quick Sort</button>
                <button>Merge Sort</button>
            </div>
        </div>
    );
};

export default SortingVisualizer;
