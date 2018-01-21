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
        startTime:{
            type:String
        },
        endTime:{
            type:String
        }
    },
    location:{
        type:String,
        required:true,
    },
    members:{
        type:Array
    }
});

var Event = db.model('event', schema);

module.exports = Event;