import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Header, Button, Form } from 'semantic-ui-react';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../common/setAuthToken';
import axios from 'axios';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/userActions';
import PropTypes from 'prop-types'

import CustomButton from '../common/CustomButton';
import CustomCard from '../common/CustomCard';

const styles = {
    layout: {
        background: 'linear-gradient(90deg,rgba(78,84,200,0.8),rgba(143, 148, 251, 0.5))',
        height: '100vh',
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

    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userID: '',
            email: '',
            password: '',
            redirect: false,
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

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

        this.props.loginUser(user);
    };

    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.user.user.isAuthenticated !== prevState.isAuthenticated) {
          return { isAuthenticated: nextProps.user.user.isAuthenticated };
       }
       else return null;
     }

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            errors: {},
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
            <div style={styles.layout}>
                {this.state.error && <h1>{this.state.error}</h1>}
                <div style={styles.wrapper}>
                    <CustomCard>
                        <img
                            src={require('../../assets/images/balance.png')}
                            alt='balance'
                            style={{ height: 80, display: 'block', margin: '-30px auto 60px auto' }}
                        />
                        <Header style={styles.header} textAlign={'left'} as='h1'>
                            Log In
                        </Header>
                        <p style={styles.subtext}>Enter your details below to login.</p>
                        <Form onSubmit={this.handleLogin}>
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
                            <CustomButton fluid style='primary' type='submit'>
                                Submit
                            </CustomButton>
                        </Form>
                        <p style={{ marginTop: 20, textAlign: 'left' }}>
                            Don't have an account?{' '}
                            <Link
                                style={{
                                    color: 'rgb(78,84,200)',
                                    marginLeft: 5,
                                    fontWeight: 700
                                }}
                                to='/register'
                            >
                                Sign up here.
                            </Link>
                        </p>
                    </CustomCard>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps, { loginUser })(Login);
