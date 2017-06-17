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
        return text.length == length ? null : errors.exactLength(length);
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

//TODO neu von Carmen hinzugefügt
export const minYear = (year) => {
    return (number) => {
        //TODO was ist 'years'
        const difference = moment().diff(number, 'years', true);
        return difference >= year ? null : errors.minYear(year);
    }
};

export const maxYear = (year) => {
    return (number) => {
        //TODO was ist 'years'
        const difference = moment().diff(number, 'years', true);
        return difference >= year ? null : errors.maxYear(year);
    }
};

export const minWeek = (week) => {
    return (number) => {
        //TODO was ist 'week'
        const difference = moment().diff(number, 'week', true);
        return difference >= week ? null : errors.minWeek(week);
    }
};

export const maxWeek = (week) => {
    return (number) => {
        //TODO was ist 'week'
        const difference = moment().diff(number, 'week', true);
        return difference >= week ? null : errors.maxWeek(week);
    }
};