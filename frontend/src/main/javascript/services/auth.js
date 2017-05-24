const TOKEN_NAME = 'token';

function storeToken(token) {
    localStorage.setItem(TOKEN_NAME, token);
}

function hasToken() {
    return localStorage.getItem(TOKEN_NAME) !==  null;
}

function removeToken() {
    localStorage.removeItem(TOKEN_NAME);
}

function getToken() {
    return localStorage.getItem(TOKEN_NAME);
}

export default {
    storeToken,
    hasToken,
    removeToken,
    getToken
};