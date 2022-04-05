const { employee, company } = require('../models');
const { employeeValidator } = require('../middlewares/validators/employee')

class EmployeeController {
    async addEmployee(req, res, next) {
        try {
            let { name, email, phone_number, jobtitle } = req.body;

            const checkEmail = await employee.findOne({
                where: {
                    email
                }
            })

            if (checkEmail) {
                return res.status(409).json({ 'status': 409, 'code': '409', 'data': null, 'message': 'Email already exist' })
            }

            const { error } = employeeValidator(req.body);
            if (error) {
                return res.status(400).json({ 'status': 400, 'code': '400', 'error': error.details[0].message })
            }

            const newData = await employee.create({
                name,
                email,
                phone_number,
                jobtitle,
                company_id: req.params.company_id
            })

            const data = await employee.findOne({
                where: {
                    id: newData.id
                },
                attributes: ['id', 'company_id']
            })

            res.status(201).json({ 'status': 201, 'code': '201', data, 'message': 'Success' })

        } catch (error) {
            console.log(error, '<<<<<<<ERROR');
            res.status(500).json({ 'status': 'error', 'code': 500, 'message': 'Error addEmployee' })
        }
    }
    async getEmployeesByCompanyId(req, res, next) {
        try {
            const findCompany = await company.findOne({
                where: {
                    id: req.params.id
                },
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                include: [
                    {
                        model: employee,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                    }
                ]
            })

            if (!findCompany) {
                return res.status(422).json({ 'status': 422, 'code': '422', 'data': null, 'message': 'Data is not found' })
            }

            res.status(200).json({ 'status': 200, 'code': '200', data: findCompany, 'message': 'Success' })
        } catch (error) {
            console.log(error, '<<<<<<<ERROR');
            res.status(500).json({ 'status': 'error', 'code': 500, 'message': 'Error getEmployeesByCompanyId' })
        }
    }
    async getEmployeeById(req, res, next) {
        try {
            const findData = await employee.findOne({
                where: {
                    id: req.params.id
                },
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt', 'company_id'] }
            })

            if (!findData) {
                return res.status(422).json({ 'status': 422, 'code': '422', 'data': null, 'message': 'Data is not found' })
            }

            res.status(200).json({ 'status': 200, 'code': '200', 'data': findData, 'message': 'Success' })

        } catch (error) {
            console.log(error, '<<<<<<<ERROR');
            res.status(500).json({ 'status': 'error', 'code': 500, 'message': 'Error getEmployeeById' })
        }
    }
    async updateEmployee(req, res, next) {
        try {

            let { name, email, phone_number, jobtitle } = req.body;

            const findEmployee = await employee.findOne({
                where: {
                    id: req.params.employee_id,
                    company_id: req.params.company_id
                }
            })

            const checkEmail = await employee.findOne({
                where: {
                    email
                }
            })

            if (checkEmail) {
                return res.status(409).json({ 'status': 409, 'code': '409', 'data': null, 'message': 'Email already exist' })
            }

            const { error } = employeeValidator(req.body);
            if (error) {
                return res.status(400).json({ 'status': 400, 'code': '400', 'error': error.details[0].message })
            }

            await employee.update({
                name,
                email,
                phone_number,
                jobtitle,
            }, {
                where: {
                    id: findEmployee.dataValues.id,
                    company_id: findEmployee.dataValues.company_id
                }
            })

            const updatedData = await employee.findOne({
                where: {
                    id: req.params.employee_id,
                    company_id: req.params.company_id
                },
                attributes: ['id', 'company_id']
            })

            res.status(201).json({ 'status': 201, 'code': '201', 'data': updatedData, 'message': 'Success' })
        } catch (error) {
            console.log(error, '<<<<<<<ERROR');
            res.status(500).json({ 'status': 'error', 'code': 500, 'message': 'Error updateEmployee' })
        }
    }
    async deleteEmployeeById(req, res, next) {
        try {
            const findEmployee = await employee.findOne({
                where: {
                    id: req.params.id
                }
            })

            const removeData = await employee.destroy({
                where: {
                    id: findEmployee.id
                }
            })

            if (!removeData) {
                return res.status(404).json({ 'status': 404, 'code': '404', 'data': null, 'message': 'Data is not found' })
            }

            res.status(204).json({ 'status': 204, 'code': '204', 'message': 'Employee has been successfully deleted' })
        } catch (error) {
            console.log(error, '<<<<<<<ERROR');
            res.status(500).json({ 'status': 'error', 'code': 500, 'message': 'Error deleteEmployeeById' })
        }
    }
}

module.exports = new EmployeeController();