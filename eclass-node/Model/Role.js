const {Schema} = require('mongoose');
const mongoose=require("mongoose");
const roleSchema=mongoose.Schema({

    rolename:{
        type:String,
        //require:true,
        //trim:true
    },
    users:[{
        type: Schema.Types.ObjectId,
        ref:'user'
    }]
    
});
const Role=mongoose.model('role',roleSchema);
module.exports={Role};