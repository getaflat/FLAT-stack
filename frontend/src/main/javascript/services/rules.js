import * as errors from './errorMessages';

import moment from 'moment';

export const isRequired = (text) => {
    return (text) ? null : errors.isRequired;
};

export const isEmail = (text) => {
    return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(text) ? null : errors.isEmail;
};

export const mustMatch = (field, name) => {
    return (text, state) => {
        return state[field] === text ? null : errors.mustMatch(name);
    }
};

export const minLength = (length) => {
    return (text) => {
        return text.length >= length ? null : errors.minLength(length);
    }
};

export const maxLength = (length) => {
    return (text) => {
        return text.length <= length ? null : errors.maxLength(length);
    }
};

export const minAge = (age) => {
    return (date) => {
        const difference = moment().diff(date, 'years', true);
        return difference >= age ? null : errors.minAge(name);
    }
};

export const maxAge = (age) => {
    return (date) => {
        const difference = moment().diff(date, 'years', true);
        return difference <= age ? null : errors.maxAge(name);
    }
};