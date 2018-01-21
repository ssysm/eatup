const User = require('../models/User');
const bcrypt = require('bcrypt-nodejs');
signup = (req,res)=>{
    const { username,email,password} = req.body;
    var passwordHash = bcrypt.hashSync(password);
    var userObj = {
        username:username,
        email:email,
        password:passwordHash
    };
    User.create(userObj,(err,docs)=>{
        console.log(err);
        if(err){
            res.json({
                success:false,
                response:err
            }).status(500)
        }else{
            res.json({
                success:true,
                response:{
                    username:docs.username
                }
            })
        }
    })
};

module.exports.signup= signup;