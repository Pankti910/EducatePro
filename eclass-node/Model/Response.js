const {Schema} = require('mongoose');
const mongoose=require("mongoose");
const responseSchema=mongoose.Schema({
    queAndans:{
        type: Schema.Types.ObjectId,
        ref:'examQuestionAnswer',
     //   default:[]
    },
    ans:{
        type:String
    },
    correctOrWrongAns:{
        type:Boolean
    },
    marks:{
        type:Number
    }
})

const response=mongoose.model('response',responseSchema);
module.exports={response};