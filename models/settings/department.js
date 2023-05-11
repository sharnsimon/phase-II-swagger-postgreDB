module.exports = (db,sequelize)=>{
    let department = db.define('department',{
        id:{
            type:sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:sequelize.STRING
        }
    },{
        tableName:'department',
        paranoid:true,
        timestamps:true,
        schema:'settings',
        underscored:true
    });
    return department
};