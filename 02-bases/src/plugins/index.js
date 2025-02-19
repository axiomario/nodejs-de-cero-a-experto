const { getAge } = require('./get-age.plugin');
const { getId } = require('./get-id.plugin');
const { httpClient } = require('./http-client.plugin');

module.exports = {
    getAge,
    getId,
    httpClient
};