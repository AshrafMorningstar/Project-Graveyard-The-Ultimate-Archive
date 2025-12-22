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

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import Methods from './components/Methods';
import Footer from './components/Footer';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Methods/>
        <Footer/>
      </div>
    )
  }
}

