export const isRequired = name => {
    return `${name} wird benötigt`;
};

export const isEmail = name => {
    return `${name} ist nicht gültig`;
};

export const mustMatch = other => {
    return (name) => `${name} muss ${other} entsprechen`;
};

export const minLength = length => {
    return (name) => `${name} sollte mindestens ${length} Zeichen enthalten`;
};

export const exactLength = length => {
    return (name) => `${name} sollte genau ${length} Zeichen enthalten`;
};

export const maxLength = length => {
    return (name) => `${name} sollte höchstens ${length} Zeichen enthalten`;
};

export const minAge = age => {
    return (name) => `${name} sollte mindestens über ${age} Jahre liegen`;
};

export const maxAge = age => {
    return (name) => `${name} sollte mindestens unter ${age} Jahre liegen`;
};

//TODO neu von Carmen hinzugefügt
export const minYear = year => {
    return (name) => `${name} sollte mindestens ${year} sein`;
};

export const maxYear = year => {
    return (name) => `${name} sollte maximal ${year} sein`;
};

export const minWeek = year => {
    return (name) => `${name} sollte mindestens ${year} sein`;
};

export const maxWeek = year => {
    return (name) => `${name} sollte mindestens ${year} sein`;
};