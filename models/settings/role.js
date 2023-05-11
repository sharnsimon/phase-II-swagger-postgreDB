module.exports = (db,sequelize)=>{
    let role = db.define('role',{
        id:{
            type:sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:sequelize.STRING
        },
        isDeleted:
        {
            type:sequelize.BOOLEAN
        }
    },{
        tableName:'role',
        paranoid:true,
        timestamps:true,
        schema:'settings',
        underscored:true
    });
    return role
};