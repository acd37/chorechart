import { LOGIN, LOGOUT, REGISTER, UPDATE_PROFILE, NEW_FAMILY, JOIN_FAMILY } from "../actions/types";

const initialState = {
    user: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                user: action.payload
            };
        case REGISTER:
            return {
                ...state,
                user: action.payload
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                user: action.payload
            };
        case NEW_FAMILY:
            return {
                ...state,
                user: action.payload
            };
        case JOIN_FAMILY:
            return {
                ...state,
                user: action.payload
            };
    }
}
