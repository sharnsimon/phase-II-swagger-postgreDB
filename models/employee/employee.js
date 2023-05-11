module.exports = (db,sequelize)=>{
    let employee = db.define('employee',{
        id:{
            type:sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        firstName:{
            type:sequelize.STRING
        },
        lastName:{
            type:sequelize.STRING
        },
        email:{
            type:sequelize.STRING
        },
        password:{
            type:sequelize.STRING
        },
        roleId:{
            type:sequelize.INTEGER
        },
        departmentId:{
            type:sequelize.INTEGER
        },
        isDeleted:{
            type:sequelize.BOOLEAN
        }
    },{
        tableName:'employee',
        paranoid:true,
        timestamps:true,
        schema:'employee',
        underscored:true
    });
  
    return employee
};