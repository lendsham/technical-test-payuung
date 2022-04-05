const router = require('express').Router();

const { fetchApi } = require('../controllers/axios.controller')

router.get('/api/countries', fetchApi)

module.exports = router;