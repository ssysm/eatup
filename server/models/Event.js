const mongoose = require('mongoose');
const db = mongoose.connect(require('../config').database);

var schema = mongoose.Schema({
    eventName:{
        type:String,
        required:true,
        index:{
            unique:true
        }
    },
    authorId:{
        type:String,
        required:true
    },
    time:{
        created:{
            type:String,
            default:Date.now()
        },
        startTime:{
            type:String
        },
        endTime:{
            type:String
        }
    },
    location:{
        type:String,
        required:true
    },
    members:[{
        uid:{
            type:String
        }
    }]
});

module.exports = mongoose.model('event', schema);