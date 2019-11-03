import validator from 'validator';
import _ from 'lodash';

const validateUserRegistration = (data) => {
    let errors = {};

    data.firstName = _.isEmpty(data.firstName) ? '' : data.firstName;
    data.lastName = _.isEmpty(data.lastName) ? '' : data.lastName;
    data.email = _.isEmpty(data.email) ? '' : data.email;
    data.password = _.isEmpty(data.password) ? '' : data.password;
    data.password2 = _.isEmpty(data.password2) ? '' : data.password2;

    if (validator.isEmpty(data.firstName)) {
        errors.firstName = 'First name is required.';
    }

    if (validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last name is required.';
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'Please enter a valid email address.';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email address is required.';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password is required.';
    }

    if (!validator.isLength(data.password, { min: 5, max: 20 })) {
        errors.password = 'Password must be between 5 and 20 characters.';
    }

    if (validator.isAlphanumeric(data.password)) {
        errors.password = 'Password must must contain at least one special character.';
    }

    if (validator.isEmpty(data.password2)) {
        errors.password2 = 'You must confirm your password.';
    }

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = 'Your passwords do not match.';
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    };
};

export default validateUserRegistration;
