import React, { Component } from 'react';
import axios from 'axios';
import { Message, Grid, Form, Button, Icon, Label, Segment, Divider } from 'semantic-ui-react';
import FamilyTile from '../common/FamilyTile';
import ChoreTile from '../common/ChoreTile';

const styles = {
    wrapper: {
        width: '1200px',
        maxWidth: '90%',
        margin: '100px auto'
    },
    label: {
        marginBottom: '1rem'
    },
    form: {
        margin: '1rem 2rem 2rem 2rem'
    }
};

class Main extends Component {
    state = {
        familyCode: '',
        familyName: '',
        errors: {}
    };

    handleCode = (e) => {
        e.preventDefault();

        const { errors, familyCode } = this.state;
        if (!familyCode) {
            errors.familyCode = 'Please provide a code.';
            return this.setState({
                errors: errors
            });
        }

        const code = { familyCode: familyCode };

        axios
            .post('/api/family/join', code)
            .then((res) => {
                console.log(res);
                this.handleGetUser();
            })
            .catch((err) => {
                const errors = {};

                if (err.response.data.familyCode) {
                    errors.familyCode = err.response.data.familyCode;
                }

                if (err.response.data.user) {
                    errors.user = err.response.data.user;
                }

                this.setState({ errors });
            });
    };

    handleFamily = (e) => {
        e.preventDefault();

        const { errors, familyName } = this.state;
        if (!familyName) {
            errors.familyName = 'Please provide a family name.';
            return this.setState({
                errors: errors
            });
        }

        const fName = { familyName: familyName };

        axios
            .post('/api/family', fName)
            .then((res) => {
                this.handleGetUser();
            })
            .catch((err) => {
                const errors = {};

                if (err) {
                    errors.familyName = 'There was an error.';
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
        let message;

        const { user } = this.props;

        // Will display one of two dashboard messages depending on whether the user is a member of a family group or not.
        if (user.family === null) {
            message = (
                <Message negative>
                    <Message.Header>Action Needed!</Message.Header>
                    <p>
                        You are currently not a member of a family. Please join a family using a
                        provided code or create a new family.
                    </p>
                    <Segment>
                        <Grid columns={2} relaxed='very' stackable>
                            <Grid.Column>
                                <Form style={styles.form} onSubmit={this.handleCode}>
                                    <Form.Input
                                        fluid
                                        label='Family Code'
                                        name='familyCode'
                                        value={this.state.familyCode}
                                        onChange={this.handleChange}
                                        placeholder='Family Code'
                                        type='text'
                                        error={
                                            this.state.errors.familyCode &&
                                            this.state.errors.familyCode
                                        }
                                    />
                                    <Label style={styles.label}>
                                        <Icon name='info circle' />
                                        The Family Code can be obtained by the Family Administrator.
                                    </Label>
                                    <Button fluid content='Join' primary />
                                </Form>
                            </Grid.Column>

                            <Grid.Column verticalAlign='middle'>
                                <Form style={styles.form} onSubmit={this.handleFamily}>
                                    <Form.Input
                                        fluid
                                        label='Family Name'
                                        name='familyName'
                                        value={this.state.familyName}
                                        onChange={this.handleChange}
                                        placeholder='Family Name'
                                        type='text'
                                        error={
                                            this.state.errors.familyName &&
                                            this.state.errors.familyName
                                        }
                                    />
                                    <Label style={styles.label}>
                                        <Icon name='info circle' />
                                        Create a unique Family Name identifier (e.g.{' '}
                                        <em>The Brady Bunch</em>).
                                    </Label>
                                    <Button fluid content='Create' primary />
                                </Form>
                            </Grid.Column>
                        </Grid>

                        <Divider vertical>Or</Divider>
                    </Segment>
                </Message>
            );
        } else {
            message = (
                <div>
                    <Message positive>
                        <Message.Header>Welcome Back!</Message.Header>
                        <p>Be sure to check your chore list.</p>
                    </Message>
                    <Grid columns={2} padded='vertically'>
                        <Grid.Column>
                            <FamilyTile user={user.familyId}></FamilyTile>
                        </Grid.Column>
                        <Grid.Column>
                            <ChoreTile user={user.chores}></ChoreTile>
                        </Grid.Column>
                    </Grid>
                </div>
            );
        }

        return (
            <div style={styles.wrapper}>
                <div>{message}</div>
            </div>
        );
    }
}

export default Main;
