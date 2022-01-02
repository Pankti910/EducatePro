const {Schema} = require('mongoose');
const mongoose=require("mongoose");

const responseSchema=mongoose.Schema({
    question:{type:Schema.Types.ObjectId,ref:'exam.queAndans'},
    answer:{type:String},
   correctOrWrongAns:{type:Number},
    marks:{type:Number}
})

const examResponseSchema=mongoose.Schema({
    userid:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    examid:{
     type: Schema.Types.ObjectId,
     ref:'exam'
    },
    reponsesByUser:[responseSchema],
    totalMarks:{
        type:Number,
        default:0,
    },
    getMarks:{
        type:Number,
        default:0
    }

})



const ExamResponse=mongoose.model('ExamResponse', examResponseSchema);
module.exports={ExamResponse};