const { company, employee } = require('../models');
const { companyValidator } = require('../middlewares/validators/company')

class CompanyController {
    async addCompany(req, res, next) {
        try {
            const { company_name, telephone_number, address } = req.body;

            const findData = await company.findOne({
                where: {
                    company_name: req.body.company_name
                }
            })

            if (findData) {
                return res.status(409).json({ 'status': 409, 'code': '409', 'data': null, 'message': 'Company Name already exist' })
            }

            const { error } = companyValidator(req.body)
            if (error) {
                return res.status(400).json({ 'status': 400, 'code': '400', 'error': error.details[0].message })
            }

            const addData = await company.create({
                company_name,
                telephone_number,
                address
            });

            const data = await company.findOne({
                where: {
                    id: addData.id
                },
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
            })

            res.status(201).json({ 'status': 201, 'code': '201', data, 'message': 'Success' });

        } catch (error) {
            console.log(error, '<<<<<<< ERROR');
            res.status(500).json({ 'status': 'error', 'code': 500, 'message': 'Error addCompany' })
        }
    }

    async getCompany(req, res, next) {
        try {

            const data = await company.findAndCountAll({
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
            })

            if (data.rows.length === 0) {
                return res.status(422).json({ 'status': 422, "code": '422', "data": null, 'message': 'Data is not found' })
            }

            res.status(200).json({ 'status': 200, 'code': '200', data, 'message': 'success' })

        } catch (error) {
            console.log(error, '<<<<<<<<<<<<ERROR');
            res.status(500).json({ 'status': 'error', 'code': 500, 'message': 'Error getCompany' })
        }
    }

    async setCompanyActive(req, res, next) {
        try {
            const currentData = await company.findOne({
                where: {
                    id: req.params.id
                }
            })

            if (currentData === null) {
                return res.status(422).json({ 'status': 422, 'code': '422', 'data': null, 'message': 'Data is not found' })
            }

            if (currentData.is_active === true) {
                return res.status(400).json({ 'status': 400, 'code': '400', 'data': null, 'message': 'Company is already active' })
            }

            await company.update({
                is_active: true
            }, {
                where: {
                    id: currentData.dataValues.id
                }
            })

            const data = await company.findOne({
                where: {
                    id: currentData.id
                },
                attributes: ['id', 'is_active']
            })

            res.status(201).json({ 'status': 201, 'code': '201', data, 'message': 'Success' })

        } catch (error) {
            console.log(error, '<<<<<<<<<<<<<ERROR');
            res.status(500).json({ 'status': 'error', 'code': 500, 'message': 'Error setCompanyActive' })
        }
    }
}

module.exports = new CompanyController();