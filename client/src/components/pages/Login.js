import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    state = {
        isAuthenticated: false,
        userID: '',
        email: '',
        password: '',
        redirect: false,
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
        axios
            .post('/api/auth/login', user)
            .then((res) => {
                console.log(res);

                if (res.data.token) {
                    localStorage.setItem('chorechart', res.data.token);
                }

                this.setState({
                    userID: res.data.id,
                    isAuthenticated: true
                });
            })
            .catch((err) => {
                const errors = {};

                if (err.response.data.email) {
                    errors.email = err.response.data.email;
                }

                if (err.response.data.user) {
                    errors.user = err.response.data.user;
                }

                this.setState({ errors });

                console.log(err.response.data);
            });
    };

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        if (this.state.isAuthenticated) {
            return (
                <Redirect
                    to={{
                        pathname: '/dashboard',
                        state: {
                            // can be access under this.props.location.state.userID in <Dashboard />
                            userID: this.state.userID
                        }
                    }}
                />
            );
        }

        return (
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <h1 className='text-center'> Login </h1>

                    <form onSubmit={this.handleLogin} className='mb-3'>
                        <div className='form-group'>
                            <label htmlFor='email'>Email address</label>
                            <input
                                type='text'
                                name='email'
                                id='email'
                                className={`form-control ${this.state.errors.email &&
                                    'is-invalid'}`}
                                onChange={this.handleChange}
                                value={this.state.email}
                            />
                            <div className='invalid-feedback'>{this.state.errors.email}</div>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                className={`form-control ${this.state.errors.password &&
                                    'is-invalid'}`}
                                onChange={this.handleChange}
                                value={this.state.password}
                            />
                            <div className='invalid-feedback'>{this.state.errors.password}</div>
                        </div>
                        <button type='submit' className='btn btn-primary btn-sm btn-block'>
                            Submit
                        </button>
                        <div style={{ marginTop: '0.25rem', fontSize: '80%', color: '#dc3545' }}>
                            {this.state.errors.user}
                        </div>
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
