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

import React from "react";
import {Link} from "react-router-dom";

const Dropdown = ({isOpen, toggle}) => {
  return (
    <div>
      <div className={isOpen ? "lg:hidden md:hidden flex flex-col w-screen text-center bg-yellow-500 text-white" : "hidden"}
      onClick={toggle}>
        <Link to="/" className="py-4">
          Home
        </Link>
        <Link to="/menu" className="py-4">
          Menu
        </Link>
        <Link to="/about" className="py-4">
          About
        </Link>
        <Link to="/contact" className="py-4">
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;
