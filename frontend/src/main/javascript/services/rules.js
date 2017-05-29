import * as errors from './errorMessages';

export const required = (text) => {
    return (text) ? null : errors.isRequired;
}

export const mustMatch = (field, name) => {
    return (text, state) => {
        return state[field] === text ? null : errors.mustMatch(name);
    };
}

export const minLength = (length) => {
    return (text) => {
        return text.length >= length ? null : errors.minLength(length);
    }
}