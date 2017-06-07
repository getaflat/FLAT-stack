export function imageBlobToBase64(blob) {
    return `data:image/png;base64,${blob}`;
}

export function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function isPrimitive(value) {
    return value == null || (typeof value !== 'function' && typeof value !== 'object');
}

export function isEqual(a, b) {
    // TODO: replace with a more save function
    return JSON.stringify(a) === JSON.stringify(b);

    // This version only works to check shallow equality
    /* if (!a && !b) { return true; }
    if (!a && b || a && !b) { return false; }

    let numKeysA = 0;
    let numKeysB = 0
    let key;

    for (key in b) {
        numKeysB += 1;

        if (!isPrimitive(b[key]) || !a.hasOwnProperty(key) || (a[key] !== b[key])) {
            return false;
        }
    }

    for (key in a) {
        numKeysA += 1;
    }

    return numKeysA === numKeysB; */
};