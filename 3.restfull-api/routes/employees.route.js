const routeEmployee = require('express').Router();
const {
    getEmployeesByCompanyId,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployeeById
} = require('../controllers/employees.controller');

routeEmployee.get('/api/companies/:id/employees', getEmployeesByCompanyId);
routeEmployee.post('/api/companies/:company_id/employees', addEmployee);
routeEmployee.put('/api/companies/:company_id/employees/:employee_id', updateEmployee);
routeEmployee.get('/api/employees/:id', getEmployeeById);
routeEmployee.delete('/api/employees/:id', deleteEmployeeById);

module.exports = routeEmployee;