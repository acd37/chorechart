import { LOGIN, LOGOUT, REGISTER, UPDATE_PROFILE, NEW_FAMILY, JOIN_FAMILY } from "./types"
import setAuthToken from '../components/common/setAuthToken';
import axios from 'axios';

export const loginUser = (userData) => dispatch => {
    axios
    .post('/api/auth/login', userData)
    // .then((res) => {
    //     if (res.data.token) {
    //         localStorage.setItem('chorechart', res.data.token);
    //         setAuthToken(localStorage.chorechart);

    //         // this.setState({
    //         //     userID: res.data.id,
    //         //     isAuthenticated: true
    //         // });
    //     }
    // })
    .then(user => dispatch({
        type: LOGIN,
        payload: {
            user: user.data,
            userID: user.data.id,
            isAuthenticated: true
        }
    }));
    // .catch((err) => {
    //     const errors = {};

    //     if (err.response.data.email) {
    //         errors.email = err.response.data.email;
    //     }

    //     if (err.response.data.password) {
    //         errors.password = err.response.data.password;
    //     }

    //     this.setState({ errors });
    // });
}

export const logoutUser = () => dispatch => {
    // logout code here
}

export const registerUser = () => dispatch => {
    // register code here
}

export const updateUser = () => dispatch => {
    // update profile code here
}

export const createNewFamily = () => dispatch => {
    // new family code here
}

export const joinFamily = () => dispatch => {
    // join family code here
}