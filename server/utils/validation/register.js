import Validator from 'validator';
import isEmpty from 'is-empty';

/**
 * Takes in data from front-end upon registration
 * and checks for empty fields, valid email formats,
 * password requirements and confirm password equality
 * returns errors object containing any errors generated from validating data
 * @param {*} data
 * @returns {*} errors
 */
export function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to empty or placeholder strings to be able to use validator functions
    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    // Check that username is not empty or does not contain alphanumeric characters
    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username is required';
    } else if (!Validator.isAlphanumeric(data.username)) {
        errors.username =
            'Username must contain only alphanumeric characters, no spacing';
    }

    // Check that password length is at least 8 characters
    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
        errors.password = 'Password must be at least 8 characters';
    }

    // Check that the password and the confirm password fields match
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords don't match";
    }

    // Check that password is not empty
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    // Check that confirm password field is not empty
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password field is required';
    }

    return {
        errors,
        success: isEmpty(errors)
    };
}
