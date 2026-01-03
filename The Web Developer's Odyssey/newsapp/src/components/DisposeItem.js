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

import React, { Component } from 'react'
import './App1.css';
export class DisposeItem extends Component {
    render() {
        //destructuring
        let {title,description,ImgUrl,NewUrl} = this.props;
        return (
            <div className='container'>
                <div className="card" >
                    <img src={ImgUrl} style={{height:'10rem'}} className="card-img-top" alt="..."/>
                    <div className ="card-body">
                    <h5 className ="card-title">{title}</h5>
                    <p className ="card-text">{description}</p>
                    <a href={NewUrl} target="_blank" className ="btn  btn-primary">Learn more...</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default DisposeItem
