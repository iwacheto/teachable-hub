import axios from 'axios';
import { store } from '../store/store';
import { setLoader } from '../store/default/defaultSlice';
const isBrowser = typeof window !== "undefined";

axios.interceptors.request.use(
    config => {
        if (isBrowser) {
            const token = localStorage.getItem('authToken');
            if (token) config.headers['Authorization'] = `token ${localStorage.getItem('authToken')}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        const isEmpty = Object.keys(error?.response?.data).length === 0;
        store.dispatch(setLoader({ show: true, message: !isEmpty ? getErrorMessage(error?.response?.data) : error?.message }));
        return Promise.reject(error);
    }
)

const getErrorMessage = error => {
    let message;
    for (const key in error) {

        switch (key) {
            case 'email':
                message = 'Email not a valid string.';
                break;
            case 'email':
                message = 'Email not a valid string.';
                break;
            case 'non_field_errors':
                message = error[key][0];
                break;
            case 'detail':
                message = error[key];
                break;
            default:
                message = 'Oops something went wrong';
                break;
        }
    }
    return message;
}
