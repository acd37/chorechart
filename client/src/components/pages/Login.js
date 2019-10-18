import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: {}
    };

    handleLogin = (e) => {
        e.preventDefault();
        const { email, password, errors } = this.state;

        if (!email) {
            errors.email = 'You must specify a valid email address.';
            return this.setState({
                errors: errors
            });
        }

        if (!password) {
            errors.password = 'You must specify a valid email password.';
            return this.setState({
                errors: errors
            });
        }

        const user = {
            email: email,
            password: password
        };

        // axios call to log in user
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
                    <h1 className='text-center'> Login </h1>

                    <form onSubmit={this.handleLogin} className='mb-3'>
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
                        <button type='submit' className='btn btn-primary btn-sm btn-block'>
                            Submit
                        </button>
                    </form>
                    <p>
                        Not registered? <Link to='/register'>Sign up.</Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default Login;
