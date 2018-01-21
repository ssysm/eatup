const mongoose = require('mongoose');
const db = mongoose.connect(require('../config').database);

var schema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        index:{
            unique:true
        }
    },
    email:{
        type:String,
        required:true,
        index:{
            unique:true
        }
    },
    password:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('User', schema);