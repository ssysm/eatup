const Event = require('../models/Event');
const mongoose = require('mongoose');
createEvent = (req,res)=>{
    const { name,authorId,startTime,endTime,gcode } = req.body;
    const eventObj = {
        eventName:name,
        authorId:authorId,
        time:{
            startTime,
            endTime
        },
        location:gcode,
        members:[
            {
                uid:authorId
            }
        ]
    };
    Event.create(eventObj,(err,docs)=>{
        if(err){
            res.json({
                success:false,
                response:err
            })
        }else{
            res.json({
                success:true,
                response:docs
            })
        }
    })
};

fetchEvent = (req,res)=>{
    var { id } = req.params;
    Event.findOne({
        _id:mongoose.Types.ObjectId(id)
    },(err,docs)=>{
        if(err){
            res.json({
                success:false,
                response:err
            })
        }else {
            res.json({
                success:true,
                response:docs
            })
        }
    })
};

joinEvent = (req,res)=>{
    var { id } = req.params;
    var { uid } = req.body;
    Event.findOne({
        _id:mongoose.Types.ObjectId(id)
    },(err,docs)=>{
        if(err){
            res.json({
                success:false,
                response:err
            })
        }else{
            if(!docs){
                res.json({
                    success:false,
                    response:docs
                })
            }else{
                Event.update({
                    _id:mongoose.Types.ObjectId(docs._id)
                },{
                    $push:{
                        members: {
                            "uid":uid
                        }
                    }
                },(err,event)=>{
                    if(err){
                        res.json({
                            success:false,
                            response:err
                        })
                    }else{
                        res.json({
                            success:true,
                            response:event
                        })
                    }
                })
            }
        }
    })
};

listEvent = (req,res)=>{
    var { limit } = req.query;
    Event.find({},[],(err,docs)=>{
        if(err){
            res.json({
                success:false,
                response:err
            })
        }else{
            res.json({
                success:true,
                response:docs
            })
        }
    })
};

listEventByUser = (req,res)=>{
    var { uid } = req.params;
    Event.find({
        authorId:uid
    },(err,docs)=>{
        if(err){
            res.json({
                success:false,
                response:err
            })
        }else{
            res.json({
                success:true,
                response:docs
            })
        }
    })
};

removeEvent = (req,res)=>{
    var { uid,eid} = req.body;
    Event.remove({
        authorId:uid,
        _id:mongoose.Types.ObjectId(eid)
    },(err,docs)=>{
        if(err){
            res.json({
                success:false,
                response:err
            })
        }else{
            res.json({
                success:true,
                response:docs
            })
        }
    })
}


module.exports.createEvent = createEvent;
module.exports.fetchEvent = fetchEvent;
module.exports.joinEvent = joinEvent;
module.exports.listEvent = listEvent;
module.exports.listEventByUser = listEventByUser;
module.exports.removeEvent = removeEvent;