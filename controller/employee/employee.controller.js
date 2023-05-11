const employeeService = require('../../services/employee/employee.service')
const {ReS,ReE,to} = require('../../global_functions');
const router = require('express').Router({mergeParams:true})
const {employeeValidator} = require('../../routes/validator/employee/employee.validator')
const validate = require('../../middleware/validate-schema')


/*
    * Original Author : Sharn S
    * Author : Sharn S
    * Created On : 10-05-2023
    * Modified On : 10-05-2023
    * Function : addEmployeeDetails
    * The method addEmployeeDetails is to insert employee details
*/


let addEmployeeDetails = async function(req,res){
    console.log('1234')
    let[err,emp] = await to(employeeService.addEmployee(req.body));
    if(err) return ReE(res,err,422)
    if(emp) return ReS(res,emp,200)
}

/*
    * Original Author : Sharn S
    * Author : Sharn S
    * Created On : 10-05-2023
    * Modified On : 10-05-2023
    * Function : getEmployeeDetails
    * Method getEmployeeDetails is to fetch employee details from the employee table 
*/

let getEmployeeDetails = async function(req,res){
    let [err,empdet] = await to(employeeService.getEmployee(req.query));
    if(err) return ReE(res,err,422)
    if(empdet) return ReS(res,empdet,200)
}


router.post('/',employeeValidator.addEmployee,validate.validate,addEmployeeDetails)
router.get('/getemp',employeeValidator.getEmployee,validate.validate,getEmployeeDetails)

module.exports = {router}