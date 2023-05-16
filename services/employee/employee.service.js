const Employee = require('../../models').employee
const {to,TE} =require('../../global_functions')
const db = require('../../models/index')
const consolidatedService = require('../consolidated.service')
const settingsService = require('../settings/settings.service')

const addEmployee = async function(data){

    let [err,emp] = await to(Employee.create({
        firstName:data.firstName,
        lastName:data.lastName,
        email:data.email,
        password:data.password,
        roleId:data.roleId,
        departmentId:data.departmentId,
        isDeleted:data.isDeleted
}))
    if(err) return TE(err.message)
    if(emp) return emp
}
module.exports.addEmployee = addEmployee

const getEmployee = async function(data){
    let [err,emp] = await to(Employee.findOne({
        where:{
            id:data?data:null
        }
    }))
    if(err) return TE(err.message)
    // if(emp){
    //     let[rolerr,role]= await to (consolidatedService.callOtherSchema(settingsService,'getRole',emp.dataValues.roleId))
    //     if(rolerr) return TE(rolerr.message)
    //     if(role) emp.dataValues.roleDetails = role;

    //     let [depterr,dept]= await to(consolidatedService.callOtherSchema(settingsService,'getDept',emp.dataValues.departmentId))
    //     if(depterr)return TE(depterr.message)
    //     if(dept) emp.dataValues.deptDetails = dept;
    // }
    // if(role&&dept) return emp
    return emp;
                           

}
module.exports.getEmployee = getEmployee

const getEmployeeDet = async function(data){
    let [err,emp] = await to(Employee.findOne({
        where:{
            id:data
        }
    }))
    if(err) return TE(err.message)
    if(emp){
        console.log('dfghj',emp)
        let[rolerr,role]= await to(consolidatedService.callOtherSchema(settingsService,'getRole',emp.dataValues.roleId))
        // console.log(role.dataValues)
        if(rolerr) return TE(rolerr.message)
        if(role) emp.dataValues.roleDetails = role;
        console.log(emp.dataValues)

        let [depterr,dept]= await to(consolidatedService.callOtherSchema(settingsService,'getDept',emp.dataValues.departmentId))
        if(depterr)return TE(depterr.message)
        if(dept) emp.dataValues.deptDetails = dept;

        return emp;
    }
    
                           

}
module.exports.getEmployeeDet = getEmployeeDet