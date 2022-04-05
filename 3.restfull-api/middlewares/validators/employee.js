const Joi = require('joi');

const employeeValidator = (payload) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'id'] } }).min(5).max(255).required(),
        phone_number: Joi.string().min(8).max(16).default(null),
        jobtitle: Joi.string().valid('manager', 'director', 'staff').default('staff').required()
    })

    return schema.validate(payload)
}

module.exports = {
    employeeValidator,
}