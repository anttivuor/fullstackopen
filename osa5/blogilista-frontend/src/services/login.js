import axios from 'axios';

const baseUrl = '/api/login';

const login = async (credentials) => {
    const response = await axios.post(`http://localhost:3003${baseUrl}`, credentials);
    return response.data;
};

export default {
    login
};