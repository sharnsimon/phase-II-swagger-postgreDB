const {check,body,param,query} = require('express-validator')

const employeeValidator = {
    addEmployee :[
        body('firstName').trim().notEmpty().withMessage('First name must not be empty'),
        body('firstName').isString().withMessage('First name must be a string'),
        body('lastName').trim().notEmpty().withMessage('Last name must not be empty'),
        body('lastName').isString().withMessage('Last name must be a string'),
        body('email').trim().isEmail().notEmpty().withMessage('Email should be in the format of abc@email.com'),
    ],
    getEmployee:[
        query('id').notEmpty().isNumeric().withMessage('ID is invalid')
    ]
}
module.exports.employeeValidator = employeeValidator