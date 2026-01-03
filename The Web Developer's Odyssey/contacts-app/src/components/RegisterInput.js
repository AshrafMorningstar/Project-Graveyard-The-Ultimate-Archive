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

import PropTypes from "prop-types";
import React, { Component } from "react";

class RegisterInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
        };
        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }
    onNameChange(e) {
        this.setState(() => {
            return {
                name: e.target.value,
            };
        });
    }
    onEmailChange(e) {
        this.setState(() => {
            return {
                email: e.target.value,
            };
        });
    }

    onPasswordChange(e) {
        this.setState(() => {
            return {
                password: e.target.value,
            };
        });
    }
    onSubmitHandler(e) {
        e.preventDefault();
        this.props.register({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        });
    }

    render() {
        return (
            <form onSubmit={this.onSubmitHandler} className="register-input">
                <input
                    type="text"
                    placeholder="Nama"
                    value={this.state.name}
                    onChange={this.onNameChange}
                />
                <input
                    type="Email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.onEmailChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                />
                <button>Register</button>
            </form>
        );
    }
}
RegisterInput.propTypes = {
    register: PropTypes.func.isRequired,
};
export default RegisterInput;
