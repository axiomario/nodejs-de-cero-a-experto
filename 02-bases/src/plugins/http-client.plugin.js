const axios = require('axios');

const httpClient = {
    get: async (url) => {
        /*const response = await fetch(url);
        const data = await response.json();*/
        const { data } = await axios.get(url);

        return data;
    },
    post: async (url, body) => {},
    put: async (url, body) => {},
    delete: async (url) => {}
};

module.exports = {
    httpClient
};