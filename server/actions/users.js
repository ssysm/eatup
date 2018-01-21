const User = require('../models/User');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const btoa = require('btoa');
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

login = (req,res)=>{
    const { username,password } = req.body;
    User.findOne({
        username:username,
    },(err,docs)=>{
        if(err){
            res.json({
                success:false,
                response:err
            }).status(500)
        }else{
            if(!docs){
                res.json({
                    success:false
                })
            }else{
                if(!bcrypt.compareSync(password,docs.password)){
                    res.json({
                        success:false
                    })
                }else {
                    res.json({
                        success: true,
                        response: {
                            token: btoa(docs._id)
                        }
                    })
                }
            }
        }
    })
}

lookupUsername = (req,res)=>{
    var { id } = req.params;
    User.findOne({
        _id:mongoose.Types.ObjectId(id)
    },["username"],(err,docs)=>{
        if(err){
            res.json({
                success:false,
                response:err
            }).status(500)
        }else{
            res.send(docs.username);
        }

    })
}

module.exports.signup= signup;
module.exports.login = login;
module.exports.lookupUsername = lookupUsername;