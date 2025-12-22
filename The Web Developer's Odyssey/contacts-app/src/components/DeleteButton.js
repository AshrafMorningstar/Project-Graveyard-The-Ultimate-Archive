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
import PropTypes from "prop-types";
import { FiXCircle } from "react-icons/fi";
function DeleteButton({ id, onDelete }) {
    return (
        <button className="contact-item__delete" onClick={() => onDelete(id)}>
            <FiXCircle />
        </button>
    );
}
DeleteButton.propTypes = {
    id: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};
export default DeleteButton;
