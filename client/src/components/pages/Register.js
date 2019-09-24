import React, { Component } from 'react';

class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    handleRegister = (e) => {
        e.preventDefault();

        const newUser = {
            email: this.state.email,
            password: this.state.password
        };

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
            <div>
                <h1> Login </h1>

                <form onSubmit={this.handleRegister}>
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
            </div>
        );
    }
}

export default Login;
