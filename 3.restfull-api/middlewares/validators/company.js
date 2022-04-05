const Joi = require('joi')

const companyValidator = (payload) => {
    const schema = Joi.object({
        company_name: Joi.string().min(3).max(50).required(),
        telephone_number: Joi.string().min(8).max(16).default(null),
        address: Joi.string().min(10).max(50)
    })

    return schema.validate(payload)
}

module.exports = { companyValidator };