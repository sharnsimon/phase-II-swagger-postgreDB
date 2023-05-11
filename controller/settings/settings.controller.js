const { ReS,ReE,to } = require('../../global_functions')
const router = require('express').Router({mergeParams:true})
const settingsService =  require('../../services/settings/settings.service')
const {departmentValidator} = require('../../routes/validator/settings/department.validator')
const {roleValidator} = require('../../routes/validator/settings/role.validator')
const validate = require('../../middleware/validate-schema')
/*
    * Original Author : Sharn S
    * Author : Sharn S
    * Created On : 11-05-2023
    * Modified On : 11-05-2023
    * Function : addDept
    * Method addDept is used to insert departments as a bulk 
*/
const addDept = async function(req,res){
    let [err,dept] = await to(settingsService.addBulkDept(req.body.data))
    if(err) return ReE(res,err,422)
    if(dept) return ReS(res,dept,200)
}

router.post('/addDept',departmentValidator.addDepartment,validate.validate,addDept)

/*
    * Original Author : Sharn S
    * Author : Sharn S
    * Created On : 11-05-2023
    * Modified On : 11-05-2023
    * Function : addRole
    * Method addRole is used to insert role as a bulk 
*/

const addRole = async function(req,res){
    let [err,dept] = await to(settingsService.addBulkRole(req.body.data))
    if(err) return ReE(res,err,422)
    if(dept) return ReS(res,dept,200)
}

router.post('/addRole',addRole)

/*
    * Original Author : Sharn S
    * Author : Sharn S
    * Created On : 11-05-2023
    * Modified On : 11-05-2023
    * Function : deleteRole
    * Method deleteRole is used to soft delete the role entries 
*/

const deleteRole = async function(req,res){
    let [err,delrow] = await to(settingsService.deleteRole(req.params.id))
    if(err) return ReE(res,err,422)
    if(delrow) return ReS(res,{"rows deleted":delrow},200)
}
 
router.put('/deleteRole/:id',roleValidator.deleteRow,validate.validate,deleteRole)

module.exports = {router}