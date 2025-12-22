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


import './App.css';

import React, { Component } from 'react' ;

import Home from './components/Home'
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Home/>
      </div>
    
      <footer className = "Footer">
        <Footer/>
      </footer>
     
    </div>
  );
}

export default App;
