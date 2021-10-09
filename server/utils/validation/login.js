import Validator from 'validator';
import isEmpty from 'is-empty';

/**
 * Takes in data from front-end upon login
 * and checks for empty fields, valid username formats, password requirements
 * returns errors object containing any errors generated from validating data
 * @param {*} data
 * @returns {*} errors
 */
export function validateLoginInput(data) {
    let errors = {};

    // Convert empty fields to empty string to be able to use validator functions
    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // Check that username is not empty and is a valid username
    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username field is required';
    } else if (!Validator.isUsername(data.username)) {
        errors.username = 'Username is invalid';
    }

    // Check that password is not empty
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    return {
        errors,
        success: isEmpty(errors)
    };
}
