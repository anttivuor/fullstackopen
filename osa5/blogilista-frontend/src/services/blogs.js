import axios from 'axios';
import {generateHeaders} from './utils';

const baseUrl = 'http://localhost:3003/api/blogs';
let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const create = async (body) => {
    const request = await axios.post(
        baseUrl,
        body,
        {headers: generateHeaders(token)}
    );
    return request.data;
};

const like = async (id, body) => {
    const request = await axios.put(
        `${baseUrl}/${id}`,
        body,
        {headers: generateHeaders(token)},
    );
    return request.data;
};

const deleteBlog = async (id) => {
    const request = await axios.delete(
        `${baseUrl}/${id}`,
        {headers: generateHeaders(token)},
    );
    return request.data;
};

export default {
    getAll,
    create,
    setToken,
    like,
    deleteBlog,
};