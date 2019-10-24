import React, { Component } from 'react';
import { Message, Container, Grid, Form, Button, Icon, Label } from 'semantic-ui-react';
import axios from 'axios';

const styles = {
    wrapper: {
        width: "1200px",
        maxWidth: "90%",
        margin: "100px auto"
    },
    label: {
        marginBottom: "1em"
    }
}

class Dashboard extends Component {
    state = {
        user: {},
        familyCode: "",
        familyName: "",
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
    
        console.log("Family Code Submitted")
    }

    handleFamily = (e) => {
        e.preventDefault();
    
        console.log("New Family Submitted")
    }

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
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
                    <Message>
                    <Container fluid>
                        <Grid divided='vertically'>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <div>Join a Family</div>
                                <Form onSubmit={this.handleCode}>
                                    <Form.Input
                                        fluid
                                        label="Family Code"
                                        name='familyCode'
                                        value={this.state.familyCode}
                                        onChange={this.handleChange}
                                        placeholder='Family Code'
                                        type="text"
                                        />
                                    <Label style={styles.label}><Icon name='info circle' />The Family Code can be obtained by the Family Administrator.</Label>
                                    <Button 
                                        fluid
                                        type='submit'>
                                        Join
                                    </Button>
                                 </Form>
                            </Grid.Column>
                            <Grid.Column>
                                <div>Create a Family</div>
                                <Form onSubmit={this.handleFamily}>
                                    <Form.Input
                                        fluid
                                        label="Family Name"
                                        name='familyName'
                                        value={this.state.familyName}
                                        onChange={this.handleChange}
                                        placeholder='Family Name'
                                        type="text"
                                        />
                                    <Button 
                                        fluid
                                        type='submit'>
                                        Create
                                    </Button>
                                 </Form>
                            </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                    </Message>
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
