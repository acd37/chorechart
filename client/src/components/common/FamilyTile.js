import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import axios from 'axios';
import Loading from '../common/Loading';

const styles = {
    data: {
        overflowWrap: 'break-word'
    }
};

class FamilyTile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            family: {}
        };
    }

    componentDidMount() {
        axios
            .get('/api/family/current')
            .then((res) => {
                this.setState({
                    family: res.data,
                    loading: false
                });
            })
            .catch((err) => console.log(err.response.data));
    }

    render() {
        return (
            <div>
                <Header textAlign={'center'} as='h2'>
                    My Family
                </Header>

                {this.state.loading ? (
                    <Loading />
                ) : (
                    <div style={styles.data}>{JSON.stringify(this.state.family.users)}</div>
                )}
            </div>
        );
    }
}

export default FamilyTile;
