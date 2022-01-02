const {Schema} = require('mongoose');
const mongoose=require("mongoose");

const PostSchema=mongoose.Schema({
    classid:{
        type:Schema.Types.ObjectId,
        ref:'class'
    },
    Content:{
        type:String
    },
    Document:{
        type:String
    },
    userid:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
          
})

const Post=mongoose.model('post',PostSchema);
module.exports={Post};