export const rule = (field, name, ...validations) => {
    return (state) => {
        for (let validation of validations) {
            let getErrorMessage = validation(state[field], state);

            if (getErrorMessage) {
                return {
                    [field]: getErrorMessage(name)
                }
            }
        }

        return null;
    }
};

export const run = (state, rules) => {
    return rules.reduce((accumulator, rule) => {
        // return Object.assign(accumulator, rule(state));
        return { ...accumulator, ...rule(state) };
    }, {});
};