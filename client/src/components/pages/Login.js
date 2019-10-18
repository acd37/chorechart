import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    handleLogin = (e) => {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
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
            <div>
                <h1> Login </h1>

                <form onSubmit={this.handleLogin}>
                    <input
                        type='text'
                        name='email'
                        id='email'
                        onChange={this.handleChange}
                        value={this.state.email}
                    />
                    <input
                        type='password'
                        name='password'
                        id='password'
                        onChange={this.handleChange}
                        value={this.state.password}
                    />
                    <button type='submit'>Submit</button>
                </form>
                <p>
                    Not registered? <Link to='/register'>Sign up.</Link>
                </p>
            </div>
        );
    }
}

export default Login;
