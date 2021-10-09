import Validator from 'validator';
import isEmpty from 'is-empty';

/**
 * Takes in data from front-end upon login
 * and checks for empty fields, valid email formats, password requirements
 * returns errors object containing any errors generated from validating data
 * @param {*} data
 * @returns {*} errors
 */
export function validateLoginInput(data) {
    let errors = {};

    // Convert empty fields to empty string to be able to use validator functions
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // Check that email is not empty and is a valid email
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
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
