import decode from 'jwt-decode'
import api from './api'
import {  } from 'react-router-dom';

const TOKEN_NAME = 'token';

export function login(credentials) {
    return new Promise((resolve, reject) => {
        api.post('/login', {
            ...credentials
        }).then((response) => {
            if (response.status === 200 && response.headers.authorization) {
                setToken(response.headers.authorization);
                resolve(response);
            } else {
                reject(response);
            }
        }).catch((error) => {
            reject(error);
        });
    });
}

export function logout() {
    clearToken();
    return Promise.resolve("Cleared token.");
}

export function requireAuth(nextState, replace) {
    if (!isLoggedIn()) {
        replace({ pathname: '/' });
    }
}

export function isLoggedIn() {
    const token = getToken();
    return !!token && !isTokenExpired(token);
}

export function getUser() {
    const encoded = getToken();
    const token = decode(encoded);
    const user = token.sub;

    if (!isLoggedIn()) { return null; }

    return user;
}

export function getToken() {
    return localStorage.getItem(TOKEN_NAME);
}

export function setToken(token) {
    localStorage.setItem(TOKEN_NAME, token);
}

function clearToken() {
    localStorage.removeItem(TOKEN_NAME);
}

function getTokenExpirationDate(encoded) {
    const date = new Date(0);
    const token = decode(encoded);

    if (!token.exp) { return null; }

    date.setUTCSeconds(token.exp);

    return date;
}

function isTokenExpired(token) {
    const expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
}

/* api.post(`/login`, {
    username: this.state.username,
    password: this.state.password
}).then((response) => {
    if (response.status === 200 && response.headers.authorization) {

        this.props.history.push('/user');
    }
}).catch((error) => {
    if (error.response) {
        console.log(error.response.data);
    }
    console.log(error.message);
}); */

/* function storeToken(token) {
    localStorage.setItem(TOKEN_NAME, token);
} */

/* function hasToken() {
    return localStorage.getItem(TOKEN_NAME) !==  null;
} */

/* function removeToken() {
    localStorage.removeItem(TOKEN_NAME);
} */

/* function getToken() {
    return localStorage.getItem(TOKEN_NAME);
} */

/* export default {
    storeToken,
    hasToken,
    removeToken,
    getToken,
    getUser
}; */