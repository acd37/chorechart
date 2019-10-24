import React, { Component } from 'react';
import { Message, Grid, Form, Button, Icon, Label, Segment, Divider } from 'semantic-ui-react';
import axios from 'axios';

const styles = {
    wrapper: {
        width: "1200px",
        maxWidth: "90%",
        margin: "100px auto"
    },
    label: {
        marginBottom: "1rem"
    },
    form: {
        margin: "1rem 2rem 2rem 2rem"
    }
}

class Dashboard extends Component {
    state = {
        user: {},
        familyCode: "",
        familyName: "",
        errors: {}
    };

    componentDidMount() {
        // const id = this.props.location.state.userID;

        axios
            .get('/api/user/current')
            .then((res) => {
                this.setState({
                    user: res.data
                });
            })
            .catch((err) => console.log(err.response.data));
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
    
        console.log("Family Code Submitted")
    }

    handleFamily = (e) => {
        e.preventDefault();
    
        console.log("New Family Submitted")
    }

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            errors: {},
            [name]: value
        });
    };

    render() {
        let message;

        if (this.state.user.family === null) {
            message = 
                <Message size='huge' negative>
                    <Message.Header>Action Needed!</Message.Header>
                    <p>You are currently not a member of a family. Please join a family using a provided code or create a new family.</p>
                    <Segment>
                        <Grid columns={2} relaxed='very' stackable>
                        <Grid.Column>
                            <Form style={styles.form} onSubmit={this.handleCode}>
                                <Form.Input
                                    fluid
                                    label="Family Code"
                                    name='familyCode'
                                    value={this.state.familyCode}
                                    onChange={this.handleChange}
                                    placeholder='Family Code'
                                    type="text"
                                    error={this.state.errors.familyCode && this.state.errors.familyCode}                                        
                                    />
                                <Label style={styles.label}><Icon name='info circle' />The Family Code can be obtained by the Family Administrator.</Label>
                                <Button fluid content='Join' primary />
                            </Form>
                        </Grid.Column>

                        <Grid.Column verticalAlign='middle'>
                        <Form style={styles.form} onSubmit={this.handleFamily}>
                            <Form.Input
                                fluid
                                label="Family Name"
                                name='familyName'
                                value={this.state.familyName}
                                onChange={this.handleChange}
                                placeholder='Family Name'
                                type="text"
                                />
                            <Label style={styles.label}><Icon name='info circle' />Create a unique Family Name identifier (e.g. <em>The Brady Bunch</em>).</Label>
                            <Button fluid content='Create' primary />
                            </Form>
                        </Grid.Column>
                        </Grid>

                        <Divider vertical>Or</Divider>
                    </Segment>
                </Message>
        } else {
            message = 
                <Message size='huge' positive>
                    <Message.Header>Welcome Back!</Message.Header>
                    <p>Be sure to check your chore list.</p>
                </Message>
        }

        return (
            <div style={styles.wrapper}>
                <h1>Dashboard</h1>
                <div>{message}
                </div>
            </div>
        );
    }
}

export default Dashboard;
