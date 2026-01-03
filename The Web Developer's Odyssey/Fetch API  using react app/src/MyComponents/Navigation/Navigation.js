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

import React from 'react';
import Button from '@material-ui/core/Button';
import './Navbar.css';

const Navigation = ({ onButtonSubmit}) => {

            return(
                <nav className='navbar'>
                    <h3 className="logo">Get user</h3>
                    <div className='nav-links'>
                        <Button className='btn' variant="contained" onClick={onButtonSubmit} color="primary">
                            Team
                        </Button>
                    </div>
                </nav>
            );
        }

export default Navigation;