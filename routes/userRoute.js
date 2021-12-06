const userController = require('../controller/userController')
const joi = require('joi')
const router = [
    //create user
    {
        method : 'POST',
        path : '/user/create-user',
        handler : userController.createUserHandler,
        options : {
            validate :{
                payload : joi.object({
                    firstName : joi.string().min(2).max(10),
                    lastName : joi.string().min(2).max(10),
                    email : joi.string().email()
                })
            }
        },
    },
    //get All User
    {
        method : 'GET',
        path : '/user/users',
        handler : userController.getAllUser
    },
    //update user
    {
        method : 'PUT',
        path : '/user/update/{id}',
        handler : userController.updateUser
    },
    {
        method : 'DELETE',
        path : '/user/delete',
        handler : userController.deleteUser
    },

]

module.exports = router