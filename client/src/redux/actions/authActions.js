/* eslint-disable no-underscore-dangle */
import axios from 'axios';

import { GET_ERRORS, USER_LOADING, CLEAN_UP_ERRORS } from './types';

// User loading
export const setUserLoading = (status) => {
    const action = {
        type: USER_LOADING,
        payload: status
    };
    return action;
};

// Set logged in user
export const setUserProfile = (profile, userType) => {
    const action = {
        type: 'SET_USER_PROFILE',
        payload: profile,
        userType: userType
    };
    return action;
};

// Login - get user token
export const loginUser = (userData, history, userType) => (dispatch) => {
    // Indicate beginnning of request
    dispatch(setUserLoading(true));

    axios
        .post(`/api/${userType}/login`, userData)
        .then((res) => {
            const { userProfile, userType } = res.data;

            dispatch(setUserProfile(userProfile, userType));

            dispatch(setUserLoading(false));
            if (userType === "operators") {
                history.push('/operator');
            } else {
                history.push('/cfs')
            }
            
        })
        .catch((err) => {
            // End of request
            dispatch(setUserLoading(false));

            // Get error information
            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data.errors,
                    source: 'login'
                });
            } else {
                // If server error redirect to error page
                history.push('/error500');
            }
        });
};

// Register User
export const registerUser = (userData, history, userType) => (dispatch) => {
    // Indicate beginnning of request
    dispatch(setUserLoading(true));

    axios
        .post(`/api/${userType}/register`, userData)
        .then(() => {
            loginUser(userData, history, userType)(dispatch);
            dispatch(setUserLoading(false));
        })
        .catch((err) => {
            dispatch(setUserLoading(false));

            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data.errors,
                    source: 'register'
                });
            } else {
                history.push('/error500');
            }
        });
};

export const cleanUpErrors = () => (dispatch) => {
    dispatch({
        type: CLEAN_UP_ERRORS
    });
};

// Log user out
export const logoutUser = () => (dispatch) => {
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setUserProfile(undefined, ''));
    cleanUpErrors();
};
