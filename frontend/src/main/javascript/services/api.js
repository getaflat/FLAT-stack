import axios from 'axios';
// import update from 'immutability-helper';

// import auth from './auth';

/* const getAuthHeader = () => {
    return {
        headers: {
            common: {
                'Authorization': { $set: auth.getToken() }
            }
        }
    }
} */

const baseAPI = axios.create({
    baseURL: '/api/v1'
});

/* const securedAPI = axios.create({
    baseURL: '/api/v1'
});

securedAPI.interceptors.request.use((config) => {
    return update(config, getAuthHeader());
}, (err) => {
    return Promise.reject(err);
}); */

/* export {
    baseAPI,
    securedAPI
} */

export default baseAPI;