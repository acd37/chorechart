import React, { Component } from 'react';
import { Header, Form, Message } from 'semantic-ui-react';
import CustomButton from '../common/CustomButton';
import axios from 'axios';

const styles = {
    formWrapper: {
        width: 800,
        maxWidth: '90%',
        margin: '0 auto'
    }
};
class Settings extends Component {
    state = {
        user: {},
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        email: this.props.user.email,
        familyId: this.props.user.familyId,
        errors: {},
        message: ''
    };

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

        const updatedUser = { firstName, lastName, email, password };

        // axios call to update user
        axios
            .put('/api/users', updatedUser)
            .then((res) => {
                this.setState({
                    message: res.data.message
                });

                window.setTimeout(() => {
                    this.setState({
                        message: ''
                    });
                }, 3000);
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
        return (
            <div>
                <Header textAlign={'center'} as='h1'>
                    Account Settings
                </Header>
                <div style={styles.formWrapper}>
                    {this.state.message && (
                        <Message positive icon='check' content={this.state.message} />
                    )}
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
            </div>
        );
    }
}

export default Settings;
