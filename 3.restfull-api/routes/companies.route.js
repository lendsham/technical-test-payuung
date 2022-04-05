const routeCompany = require('express').Router();
const {
    addCompany,
    getCompany,
    setCompanyActive
} = require('../controllers/companies.controller');

routeCompany.post('/api/companies', addCompany);
routeCompany.get('/api/companies', getCompany);
routeCompany.put('/api/companies/:id/set_active', setCompanyActive);


module.exports = routeCompany;