import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    };

    handleRegister = (e) => {
        e.preventDefault();

        const { errors, firstName, lastName, email, password, password2 } = this.state;
        if (!firstName) {
            errors.firstName = 'You must specify a first name.';
            return this.setState({
                errors: errors
            });
        }
        if (!lastName) {
            errors.lastName = 'You must specify a valid last name.';
            return this.setState({
                errors: errors
            });
        }

        if (!email) {
            errors.email = 'You must specify a valid email address.';
            return this.setState({
                errors: errors
            });
        }

        if (!password) {
            errors.password = 'You must specify a valid password.';
            return this.setState({
                errors: errors
            });
        }

        if (!password2) {
            errors.password = 'You must confirm you password.';
            return this.setState({
                errors: errors
            });
        }

        if (password !== password2) {
            errors.password = 'Your passwords do not match.';
            return this.setState({
                errors: errors
            });
        }

        const newUser = { firstName, lastName, email, password };

        // axios call to register new user
    };

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <h1 className='text-center'> Register </h1>

                    <form onSubmit={this.handleRegister} className='mb-3'>
                        <div className='form-group'>
                            <label for='firstName'>First Name</label>
                            <input
                                type='text'
                                name='firstName'
                                id='firstName'
                                className={`form-control ${this.state.errors.firstName &&
                                    'is-invalid'}`}
                                onChange={this.handleChange}
                                value={this.state.firstName}
                            />
                            <div class='invalid-feedback'>{this.state.errors.firstName}</div>
                        </div>
                        <div className='form-group'>
                            <label for='lastName'>Last Name</label>
                            <input
                                type='text'
                                name='lastName'
                                id='lastName'
                                className={`form-control ${this.state.errors.lastName &&
                                    'is-invalid'}`}
                                onChange={this.handleChange}
                                value={this.state.lastName}
                            />
                            <div class='invalid-feedback'>{this.state.errors.lastName}</div>
                        </div>
                        <div className='form-group'>
                            <label for='email'>Email address</label>
                            <input
                                type='text'
                                name='email'
                                id='email'
                                className={`form-control ${this.state.errors.email &&
                                    'is-invalid'}`}
                                onChange={this.handleChange}
                                value={this.state.email}
                            />
                            <div class='invalid-feedback'>{this.state.errors.email}</div>
                        </div>
                        <div className='form-group'>
                            <label for='password'>Password</label>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                className={`form-control ${this.state.errors.password &&
                                    'is-invalid'}`}
                                onChange={this.handleChange}
                                value={this.state.password}
                            />
                            <div class='invalid-feedback'>{this.state.errors.password}</div>
                        </div>
                        <div className='form-group'>
                            <label for='password2'>Confirm Password</label>
                            <input
                                type='password'
                                name='password2'
                                id='password2'
                                className={`form-control ${this.state.errors.password &&
                                    'is-invalid'}`}
                                onChange={this.handleChange}
                                value={this.state.password2}
                            />
                            <div class='invalid-feedback'>{this.state.errors.password}</div>
                        </div>
                        <button className='btn btn-primary btn-sm btn-block' type='submit'>
                            Submit
                        </button>
                    </form>
                    <p>
                        Already registered? <Link to='/'>Login.</Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default Login;
