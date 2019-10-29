import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import axios from 'axios';

const styles = {
    data: {
        overflowWrap: "break-word"
    }
}

export default class FamilyTile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            family: {}
        }
      }

      UNSAFE_componentWillReceiveProps() {
        axios
            .get('/api/family/current', this.props.user)
            .then((res) => {
                this.setState({
                    family: res.data
                });
            })
            .catch((err) => console.log(err.response.data));
    }

    render() {
        return (
            <div>
                <Header textAlign={"center"} as='h2'>My Family</Header>
                <div style={styles.data}>{JSON.stringify(this.state.family.users)}</div>
            </div>
        )
    }
}
