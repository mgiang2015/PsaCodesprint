import isEmpty from 'is-empty';
import { USER_LOADING, SET_USER_PROFILE } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    userProfile: undefined,
    userType: '',
    loading: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                userProfile: action.payload,
                userType: action.userType
            };
        default:
            return state;
    }
};

export default authReducer;
