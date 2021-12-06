// const UserModel = require('../models').user;
const user = require('../models/user');
const db = require('../models/index')
const User = user(db.sequelize,db.Sequelize.DataTypes)

exports.createUserHandler = async(request,h)=>{
    const {email}=request.payload
    try {
        const userAlreadyExist = await User.findOne({
            where:{email}
        })
        if(userAlreadyExist){
            throw new Error('user already exist')
        }
        const newUser = await User.create({
            firstName : request.payload.firstName,
            lastName : request.payload.lastName,
            email : request.payload.email
        })
        return {
            msg : 'user created successfully',
            newUser
        }
    } catch (error) {
        // console.log(error)
        return h.response({error : error.message}).code(400)
    }
}

exports.getAllUser = async(request,h)=>{
    try {
        const users = await User.findAll({
            attributes : {exclude : ['createdAt','updatedAt']}
        })
        return{
            users
        }
    } catch (error) {
        return h.response({error : error.message}).code(400)
    }
    
}

exports.updateUser = async(request,h)=>{
    try {
        const tempUser = await User.findOne({
            where : {
                id : request.params.id
            }
        })
        const user = await User.update({
            firstName : request.payload.firstName ? request.payload.firstName : tempUser.firstName,
            lastName : request.payload.lastName ? request.payload.lastName : tempUser.lastName,
            email : request.payload.email ? request.payload.email : tempUser.email
        },{
            where :{
                id : request.params.id
            }
        })
        return{
            msg : 'user updated successfully',
            user
        }
    } catch (error) {
        return h.response({error: error.message})
    }
}


exports.deleteUser = async(request,h)=>{
    try {
        await User.destroy({
            where : {
                id : request.query.id
            }
        })
        return{
            msg : 'user destroy successfully',
        }
    } catch (error) {
        return h.response({error: error.message})
    }
}