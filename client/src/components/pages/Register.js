import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Header, Form } from 'semantic-ui-react';
import validateUserRegistration from '../../utils/validateUserRegistration';

import axios from 'axios';

import validator from 'validator';

import CustomCard from '../common/CustomCard';
import CustomButton from '../common/CustomButton';

const styles = {
    layout: {
        background: 'linear-gradient(90deg,rgba(78,84,200,0.8),rgba(143, 148, 251, 0.5))',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50
    },
    wrapper: {
        width: '450px',
        maxWidth: '90%'
    },
    header: {
        color: 'rgb(78,84,200)',
        fontWeight: 300,
        textTransform: 'uppercase',
        letterSpacing: 1.2
    },
    subtext: {
        color: 'rgba(0,0,0,0.6)',
        marginBottom: 50
    }
};

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

        const { firstName, lastName, email, password, password2 } = this.state;

        const newUser = {
            firstName,
            lastName,
            email,
            password,
            password2
        };

        const errors = validateUserRegistration(newUser);

        if (errors) {
            this.setState({
                errors
            });
        } else {
            newUser.email = validator.normalizeEmail(email);

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
        }
    };

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />;
        }

        return (
            <div style={styles.layout}>
                <div style={styles.wrapper}>
                    <CustomCard>
                        <img
                            src={require('../../assets/images/balance.png')}
                            alt='balance'
                            style={{ height: 80, display: 'block', margin: '-30px auto 60px auto' }}
                        />
                        <Header style={styles.header} textAlign={'left'} as='h1'>
                            Register
                        </Header>
                        <p style={styles.subtext}>Enter your details below to login.</p>
                        <Form onSubmit={this.handleRegister}>
                            <Form.Input
                                fluid
                                label='First Name'
                                name='firstName'
                                value={this.state.firstName}
                                onChange={this.handleChange}
                                placeholder='First Name'
                                type='text'
                                error={this.state.errors.firstName && this.state.errors.firstName}
                            />
                            <Form.Input
                                fluid
                                label='Last Name'
                                name='lastName'
                                value={this.state.lastName}
                                onChange={this.handleChange}
                                placeholder='First Name'
                                type='text'
                                error={this.state.errors.lastName && this.state.errors.lastName}
                            />
                            <Form.Input
                                fluid
                                label='Email'
                                name='email'
                                value={this.state.email}
                                onChange={this.handleChange}
                                placeholder='Email'
                                type='email'
                                error={this.state.errors.email && this.state.errors.email}
                            />
                            <Form.Input
                                fluid
                                label='Password'
                                name='password'
                                value={this.state.password}
                                onChange={this.handleChange}
                                placeholder='Password'
                                type='password'
                                error={this.state.errors.password && this.state.errors.password}
                            />
                            <Form.Input
                                fluid
                                label='Confirm Password'
                                name='password2'
                                value={this.state.password2}
                                onChange={this.handleChange}
                                placeholder='Confirm Password'
                                type='password'
                                error={this.state.errors.password2 && this.state.errors.password2}
                            />
                            <CustomButton fluid style='primary' type='submit'>
                                Submit
                            </CustomButton>
                        </Form>
                        <p style={{ marginTop: 20, textAlign: 'left' }}>
                            Already registered?{' '}
                            <Link
                                style={{
                                    color: 'rgb(78,84,200)',
                                    marginLeft: 5,
                                    fontWeight: 700
                                }}
                                to='/'
                            >
                                Login.
                            </Link>
                        </p>
                    </CustomCard>
                </div>
            </div>
        );
    }
}

export default Login;
