import * as errors from './errorMessages';

import moment from 'moment';

export const isRequired = (text) => {
    return (text) ? null : errors.isRequired;
};

export const isEmail = (text) => {
    return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(text) ? null : errors.isEmail;
};

export const mustMatch = (field, name) => {
    return (value, state) => {
        return state[field] === value ? null : errors.mustMatch(name);
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

export const exactLength = (length) => {
    return (text) => {
        return text.length === length ? null : errors.exactLength(length);
    }
};

export const minAge = (age) => {
    return (date) => {
        const difference = moment().diff(date, 'years', true);
        return difference >= age ? null : errors.minAge(age);
    }
};

export const maxAge = (age) => {
    return (date) => {
        const difference = moment().diff(date, 'years', true);
        return difference <= age ? null : errors.maxAge(age);
    }
};

export const minYear = (year) => {
    return (number) => {
        return number >= year ? null : errors.minYear(year);
    }
};

export const maxYear = (year) => {
    return (number) => {
        return number <= year ? null : errors.maxYear(year);
    }
};

export const minWeek = (week) => {
    return (number) => {
        return number >= week ? null : errors.minWeek(week);
    }
};

export const maxWeek = (week) => {
    return (number) => {
        return number <= week ? null : errors.maxWeek(week);
    }
};