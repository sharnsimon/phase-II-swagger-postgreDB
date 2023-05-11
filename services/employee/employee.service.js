const Employee = require('../../models').employee
const {to,TE} =require('../../global_functions')
const addEmployee = async function(data){
    console.log('1234r')
    let [err,emp] = await to(Employee.create({
        firstName:data.firstName,
        lastName:data.lastName,
        email:data.email,
        password:data.password?data.password:null,
        roleId:data.roleId?data.roleId:0,
        departmentId:data.departmentId?data.departmentId:0,
        isDeleted:data.isDeleted
}))
    if(err) return TE(err.message)
    if(emp) return emp
}
module.exports.addEmployee = addEmployee

const getEmployee = async function(data){
    let[errr,count] = await to(Employee.count())
    if(data.id<=count){
    let [err,emp] = await to(Employee.findOne({
        where:{
            id:data.id
        }
    }))
    if(err) return TE(err.message)
    return emp
}
    else{
        return TE(`The total number of employees is ${count}`)
    }
}
module.exports.getEmployee = getEmployee