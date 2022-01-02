const {Schema} = require('mongoose');
const mongoose=require("mongoose");


const studentsSubmissionSchema=mongoose.Schema({
    students:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    file:{
        type:String
    }
})

const assginmentSchema=mongoose.Schema({
    classid:{
        type:Schema.Types.ObjectId,
        ref:'class'
    },
    assignmentName:{
        type:String
    },
    assignmentDocument:{
        type:String
    },
    studentsSubmission:[studentsSubmissionSchema]
        
})

const Assignment=mongoose.model('assignment',assginmentSchema);
module.exports={Assignment};