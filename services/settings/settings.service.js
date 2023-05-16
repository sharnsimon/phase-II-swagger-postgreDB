const Department = require('../../models').department
const Role =  require('../../models').role
const Employee = require('../../models').employee
const {to,TE, ReE} = require('../../global_functions')

const getRole = async function(data){
  
    let [err,role] = await to(Role.findOne({
        where:{
            id:data?data:null
        }
    }))
    if(err) return TE(err.message)
    if(role) return role
}

module.exports.getRole = getRole

const getDept = async function(data){
  
    let [err,dept] = await to(Department.findOne({
        where:{
            id:data?data:null
        }
    }))
    if(err) return TE(err.message)
    if(dept) return dept
}

module.exports.getDept = getDept


const addBulkDept = async function(data){
    let [err,dept] = await to(Department.bulkCreate(data));
    if(err) return TE(err.message)
    if(dept) return dept
}

module.exports.addBulkDept = addBulkDept

const addBulkRole = async function(data){
    let [err,dept] = await to(Role.bulkCreate(data));
    if(err) return TE(err.message)
    if(dept) return dept
}

module.exports.addBulkRole = addBulkRole

const deleteRole = async function(data){
    let [err,role] = await to(Role.update(
        {
            isDeleted:true
        },{
            where:{
                id:data
            }
        }
        ));
    if(err) return TE(err.message)
    console.log('qwert',role)
    if(role){
        console.log('1234')
        let [errr,emp] = await to(Employee.update(
            {
                isDeleted:true
            },{
                where:{
                    roleId:data
                }
            }));
        if(errr) return TE(errr.message)
        console.log('123453',emp)
        if(role&&emp) return emp
        
    }
    
}

module.exports.deleteRole = deleteRole  

