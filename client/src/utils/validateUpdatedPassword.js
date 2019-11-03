import validator from 'validator';
import _ from 'lodash';

const validateUpdatedPassword = (data) => {
    let errors = {};

    data.currentPassword = _.isEmpty(data.currentPassword) ? '' : data.currentPassword;
    data.newPassword = _.isEmpty(data.newPassword) ? '' : data.newPassword;
    data.confirmNewPassword = _.isEmpty(data.confirmNewPassword) ? '' : data.confirmNewPassword;

    if (validator.isEmpty(data.currentPassword)) {
        errors.currentPassword = 'Password is required.';
    }
    if (validator.isEmpty(data.newPassword)) {
        errors.newPassword = 'New password is required.';
    }
    if (validator.isEmpty(data.confirmNewPassword)) {
        errors.confirmNewPassword = 'You must confirm your password';
    }

    if (!validator.isLength(data.newPassword, { min: 5, max: 20 })) {
        errors.newPassword = 'Password must be between 5 and 20 characters.';
    }

    if (validator.isAlphanumeric(data.newPassword)) {
        errors.newPassword = 'Password must must contain at least one special character.';
    }

    if (!validator.equals(data.newPassword, data.confirmNewPassword)) {
        errors.newPassword = 'Your passwords do not match.';
        errors.confirmNewPassword = 'Your passwords do not match.';
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    };
};

export default validateUpdatedPassword;
