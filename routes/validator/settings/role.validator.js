const{body,query,param} = require('express-validator')


const roleValidator = {
    deleteRow:[
        param('id').isNumeric().withMessage('Invalid ID')
    ]
}

module.exports.roleValidator = roleValidator