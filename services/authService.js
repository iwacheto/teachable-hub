import axios from "axios";
const isBrowser = typeof window !== "undefined";

const login = async (data) => {
    try {
        const response = await axios.post(`${process.env.BASE_API_URL}/auth/token/login/`, data);
        if (response && response.status === 200) {
            if (isBrowser) localStorage.setItem('authToken', response.data.auth_token);
            return getUserData(response.data.auth_token);
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

const getUserData = async token => {
    try {
        const response = await axios.get(`${process.env.BASE_API_URL}/users/me/`, {
            headers: {
                Authorization: `token ${token}`,
            }
        });
        if (response && response.status === 200) {
            if (isBrowser) localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        } else {
            return null
        }
    } catch (error) {

    }
}


export const authenticationService = {
    login,
    getUserData,
};

