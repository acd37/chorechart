import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react'
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
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',
        redirect: false,
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
            errors.password2 = 'Your passwords do not match.';
            return this.setState({
                errors: errors
            });
        }

        const newUser = { firstName, lastName, email, password };

        // axios call to register new user
        axios
            .post('/api/user', newUser)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    redirect: true
                });
            })
            .catch((err) => {
                const errors = {};
                if (err.response.data.email) {
                    errors.email = err.response.data.email;
                }

                this.setState({ errors });
            });
    };

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            errors: {},
            [name]: value
        });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />;
        }

        return (
            <div style={styles.wrapper}>
            <h1>Register</h1>
            <Form onSubmit={this.handleRegister}>
            <Form.Input
                fluid
                label="First Name"
                name='firstName'
                value={this.state.firstName}
                onChange={this.handleChange}
                placeholder='First Name'
                type="text"
                error={this.state.errors.firstName && this.state.errors.firstName}
                />
            <Form.Input
                fluid
                label="Last Name"
                name='lastName'
                value={this.state.lastName}
                onChange={this.handleChange}
                placeholder='First Name'
                type="text"
                error={this.state.errors.lastName && this.state.errors.lastName}
                />
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
            <Form.Input
                fluid
                label="Confirm Password"
                name='password2'
                value={this.state.password2}
                onChange={this.handleChange}
                placeholder='Confirm Password'
                type="password"
                error={this.state.errors.password2 && this.state.errors.password2}
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
