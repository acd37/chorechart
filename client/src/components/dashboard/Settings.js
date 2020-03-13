import React, { Component } from 'react';
import { Header, Form, Message, Icon, Input } from 'semantic-ui-react';
import CustomButton from '../common/CustomButton';
import axios from 'axios';
import validateUpdatedPassword from '../../utils/validateUpdatedPassword';

const styles = {
    profileForm: {
        width: 600,
        marginTop: 50,
        maxWidth: '100%'
    },
    passwordForm: {
        display: "inline-block",
        width: 400,
        marginTop: 50,
        maxWidth: '100%'
    },
    avatarForm: {
        display: "inline-block",
        width: 400,
        marginLeft: 50
    }
};

class Settings extends Component {
    state = {
        user: {},
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        email: this.props.user.email,
        familyId: this.props.user.familyId,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        errors: {},
        messages: {},
        file: {}
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
                    messages: res.data.messages
                });

                window.setTimeout(() => {
                    this.setState({
                        messages: {}
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

    handleUpdatePassword = (e) => {
        e.preventDefault();

        const passwordData = {
            currentPassword: this.state.currentPassword,
            newPassword: this.state.newPassword,
            confirmNewPassword: this.state.confirmNewPassword
        };

        const { errors, isValid } = validateUpdatedPassword(passwordData);

        if (!isValid) {
            return this.setState({
                errors
            });
        }

        axios
            .put('/api/user/password', passwordData)
            .then((res) => {
                this.setState({
                    messages: res.data.messages,
                    currentPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                });

                window.setTimeout(() => {
                    this.setState({
                        messages: {}
                    });
                }, 3000);
            })
            .catch((err) => {
                this.setState({
                    errors: err.response.data
                });

                window.setTimeout(() => {
                    this.setState({
                        errors: {}
                    });
                }, 3000);
            });
    };

    handleUpdateAvatar = (e) => {

    }

    fileInputRef = React.createRef();

    fileChange = e => {
        this.setState({ file: e.target.files[0] }, () => {
          console.log("File chosen --->", this.state.file);
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
                <div style={styles.profileForm}>
                    <Header textAlign={'left'} as='h2'>
                        Profile
                    </Header>
                    {this.state.messages.user && (
                        <Message positive icon='check' content={this.state.messages.user} />
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
                <div style={styles.passwordForm}>
                    <Header textAlign={'left'} as='h2'>
                        Update Password
                    </Header>
                    {this.state.messages.password && (
                        <Message positive icon='check' content={this.state.messages.password} />
                    )}
                    {this.state.errors.password && (
                        <Message negative icon='check' content={this.state.errors.password} />
                    )}
                    <Form onSubmit={this.handleUpdatePassword}>
                        <Form.Input
                            fluid
                            label='Current password'
                            name='currentPassword'
                            value={this.state.currentPassword}
                            onChange={this.handleChange}
                            placeholder='Current password'
                            type='password'
                            error={this.state.errors.currentPassword}
                        />
                        <Form.Input
                            fluid
                            label='New password'
                            name='newPassword'
                            value={this.state.newPassword}
                            onChange={this.handleChange}
                            placeholder='New password'
                            type='password'
                            error={this.state.errors.newPassword}
                        />
                        <Form.Input
                            fluid
                            label='Confirm new password'
                            name='confirmNewPassword'
                            value={this.state.confirmNewPassword}
                            onChange={this.handleChange}
                            placeholder='Confirm new password'
                            type='password'
                            error={this.state.errors.confirmNewPassword}
                        />
                        <CustomButton fluid style='primary' type='submit'>
                            Update
                        </CustomButton>
                    </Form>
                </div>
                <div style={styles.avatarForm}>
                    <Form onSubmit={this.handleUpdateAvatar}>
                        <Form.Input
                            fluid
                            label='Upload Avatar'
                            name='uploadAvatar'
                            value={this.state.uploadAvatar}
                            icon={<Icon name='search' onClick={() => this.fileInputRef.current.click()} inverted circular link />}
                            onChange={this.handleChange}
                            placeholder='No Avatar Set'
                            error={this.state.errors.uploadAvatar}
                            value={this.state.file.name}
                        />
                        <input ref={this.fileInputRef} type="file" onChange={this.fileChange} hidden />                  
                        <CustomButton fluid style='primary' type='submit'>
                            Upload
                        </CustomButton>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Settings;
