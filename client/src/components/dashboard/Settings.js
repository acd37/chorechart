import React, { Component } from 'react';
import { Header, Form } from 'semantic-ui-react';
import CustomButton from '../common/CustomButton';
import axios from 'axios';

class Settings extends Component {
    state = {
        user: {},
        firstName: '',
        lastName: '',
        email: '',
        familyId: '',
        errors: {}
    };

    static getDerivedStateFromProps(props, state) {
        if (props.user !== state.user) {
            return {
                firstName: props.user.firstName,
                lastName: props.user.lastName,
                email: props.user.email,
                familyId: props.user.familyId
            };
        }
    }

    handleUpdateProfile = (e) => {
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

        const updatedUser = { firstName, lastName, email, password };

        // axios call to register new user
        // axios
        //     .post('/api/user', newUser)
        //     .then((res) => {
        //         console.log(res.data);
        //         this.setState({
        //             redirect: true
        //         });
        //     })
        //     .catch((err) => {
        //         const errors = {};
        //         if (err.response.data.email) {
        //             errors.email = err.response.data.email;
        //         }

        //         this.setState({ errors });
        //     });
    };

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            errors: {},
            [name]: value
        });
    };

    render() {
        return (
            <div>
                <Header textAlign={'center'} as='h1'>
                    Account Settings
                </Header>
                <Form onSubmit={this.handleUpdateProfile}>
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
                    <CustomButton fluid style='primary' type='submit'>
                        Submit
                    </CustomButton>
                </Form>
            </div>
        );
    }
}

export default Settings;
