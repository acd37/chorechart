import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react'
import jwtDecode from 'jwt-decode';
import setAuthToken from '../common/setAuthToken';
import axios from 'axios';

const styles = {
    wrapper: {
        width: "400px",
        maxWidth: "90%",
        margin: "100px auto"
    }
}

class Login extends Component {
    state = {
        isAuthenticated: false,
        userID: '',
        email: '',
        password: '',
        redirect: false,
        errors: {}
    };

    componentDidMount() {
        // Persistent Login
        if (localStorage.chorechart) {
            setAuthToken(localStorage.chorechart);
            const decoded = jwtDecode(localStorage.chorechart);
            const currentTime = Date.now() / 1000;

            if (decoded.exp > currentTime) {
                this.setState({
                    userID: decoded.id,
                    isAuthenticated: true
                });
            }
        }
    }

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
                    setAuthToken(localStorage.chorechart);

                    this.setState({
                        userID: res.data.id,
                        isAuthenticated: true
                    });
                }
            })
            .catch((err) => {
                const errors = {};

                if (err.response.data.email) {
                    errors.email = err.response.data.email;
                }

                if (err.response.data.password) {
                    errors.password = err.response.data.password;
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
            <div style={styles.wrapper}>
                <h1>Login</h1>
                <Form onSubmit={this.handleLogin}>
                <Form.Input
                    fluid
                    label="Email"
                    name='email'
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder='Email'
                    type="email"
                    error={this.state.errors.email && this.state.errors.email}
                    />
                <Form.Input
                    fluid
                    label="Password"
                    name='password'
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder='Password'
                    type="password"
                    error={this.state.errors.password && this.state.errors.password}
                    />
                <Button 
                    fluid
                    type='submit'>
                    Submit
                </Button>
            </Form>
            <p>
            Not registered? <Link to='/register'>Sign up.</Link>
            </p>
          </div>
        );
    }
}

export default Login;
