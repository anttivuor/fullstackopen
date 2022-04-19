import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const add = async (content) => {
    const data = {content, votes: 0};
    const response = await axios.post(baseUrl, data);
    return response.data;
};

const vote = async (data) => {
    const response = await axios.put(`${baseUrl}/${data.id}`, data);
    return response.data;
}

export default {
    getAll,
    add,
    vote,
};