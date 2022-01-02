const {Schema} = require('mongoose');
const mongoose=require("mongoose");




const classSchema=mongoose.Schema({

    classname:{
        type:String,
        //required:true
    },
    classcolor:{
        type:String
    },
    classcode:{
        type:String,
        unique:true
    },
    creatorOfclass:{
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    teachers:[{
        type: Schema.Types.ObjectId,
        ref:'user'
    }],
    students:[{
        type: Schema.Types.ObjectId,
        ref:'user',
        default:[]
    }],
    status:{
        type:String,
        default:'Unblock'
    },

    exams:[{
       type:Schema.Types.ObjectId,
       ref:'exam',
       default:[]
    }],
    assignments:[{
        type:Schema.ObjectId,
        ref:'assignment',
        default:[],

    }],
    posts:[{
        type:Schema.Types.ObjectId,
        ref:'post',
        default:[],
    }]

    
});
const Class=mongoose.model('class',classSchema);
module.exports={Class};