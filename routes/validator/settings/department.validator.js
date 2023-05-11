const {check,body} = require('express-validator')

const departmentValidator = {
    addDepartment:[
        body('data').isArray().notEmpty().withMessage("Data must be in the form of array"),
        check('data.*.name').optional({checkFalsy:true}).notEmpty().isString().withMessage("Invalid Department Name")
    ]
}   

module.exports.departmentValidator = departmentValidator