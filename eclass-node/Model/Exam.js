const {Schema} = require('mongoose');
const mongoose=require("mongoose");

const examQueAndAns=mongoose.Schema({
    question:{type:String},
    option1:{ type:String},
    option2:{ type:String},
    option3:{ type:String},
    option4:{ type:String},
    correctAnswer:{type:String},
    marks:{type:Number,default:1}
})

const examSchema=mongoose.Schema({
    class:{
        type:Schema.Types.ObjectId,
        ref:'class'
    },
    exam:{type:String},
    queAndans:[examQueAndAns],
    totalMarks:{
        type:Number
    }
    
})

const Exam=mongoose.model('exam',examSchema);
module.exports={Exam};