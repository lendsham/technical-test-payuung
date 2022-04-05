const axios = require('axios');

const API_URL = `https://gist.githubusercontent.com/herysepty/ba286b815417363bfbcc472a5197edd0/raw/aed8ce8f5154208f9fe7f7b04195e05de5f81fda/coutries.json`

const fetchApi = async (req, res) => {
    try {
        const response = await axios.get(API_URL)
        let obj = [];
        for (let i = 0; i < response.data.length; i++) {
            obj[i] = {
                name: response.data[i].name,
                region: response.data[i].region,
                timezones: response.data[i].timezones,
            }
        }
        res.status(200).json({ 'status': 200, 'code': '200', 'data': obj, 'message': 'Success' })
    } catch (error) {
        res.status(400).json({ 'status': 400, 'code': '400', 'data': null, 'message': 'Something Went Wrong' })
    }
}

module.exports = { fetchApi }