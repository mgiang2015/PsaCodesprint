import { GET_ERRORS, CLEAN_UP_ERRORS } from '../actions/types';

const initialState = {
    login: {},
    register: {}
};

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ERRORS:
            return {
                ...state,
                [action.source]: action.payload
            };
        case CLEAN_UP_ERRORS:
            return initialState;
        default:
            return state;
    }
};

export default errorReducer;
