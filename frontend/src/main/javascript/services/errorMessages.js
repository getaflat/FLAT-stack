export const isRequired = name => `${name} darf nicht leer sein`;

export const mustMatch = other => {
    return (name) => `${name} must match ${other}`;
}

export const minLength = length => {
    return (name) => `${name} sollte mindestens ${length} Zeichen enthalten`;
}