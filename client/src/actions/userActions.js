import { LOGIN, LOGIN_ERROR, LOGOUT, REGISTER, UPDATE_PROFILE, NEW_FAMILY, JOIN_FAMILY } from "./types"
import setAuthToken from '../components/common/setAuthToken';
import axios from 'axios';

export const loginUser = (userData) => dispatch => {
    axios
    .post('/api/auth/login', userData)
    .then((res) => {
        if (res.data.token) {
            localStorage.setItem('chorechart', res.data.token);
            setAuthToken(localStorage.chorechart);
            dispatch({
                type: LOGIN,
                payload: {
                    user: res.data,
                    userID: res.data.id,
                    isAuthenticated: true
                }
            })
        }
    })
    .catch((err) => dispatch({
        type: LOGIN_ERROR,
        payload: {
            error: err
        }
    }))
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('chorechart');

    dispatch({
        type: LOGOUT,
        payload: {
            redirect: true
        }
    })
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