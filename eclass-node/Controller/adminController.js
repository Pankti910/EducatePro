const {User}=require('../Model/User');
const {Role}=require('../Model/Role');
const {Class}=require('../Model/Class');
var ObjectId = require('mongoose').Types.ObjectId;


class Message{
    message=null;
    constructor(){}
    set message(message){
      this.message=message;
    }
    get message(){
        return this.message;
    }
}

exports.getUsers=(req,res,next)=>{

    let m=new Message();
    User.find({},{fname:1,lname:1,email:1,status:1}).then((data)=>{
        m.message="user data fetch";
    res.status(200).json({messasge:m,users:data});
    }).catch(err=>console.log(err));
     
}


exports.getClasses=(req,res,next)=>{
    let m=new Message();
    Class.find({},{classname:1,creatorOfClass:1,status:1}).populate('creatorOfclass',{fname:1,lname:1,email:1}).exec().then(function(docs){
        m.message="class data fetch";      
        res.status(200).json({message:m,classes:docs});
    }).catch(err=>console.log(err));
}

exports.changeStatusUser=(req,res,next)=>{
    const id=req.params.id;
  let m=new Message();
   var user=req.body;
   if(user.status=="Block") user.status="Unblock";
   else if(user.status=="Unblock") user.status="Block";

    User.findByIdAndUpdate(id,user,{ upsert: true, new: true }).then((data)=>{
        
        data.save();
        m.message="Status of user is changed";
        res.status(200).json({messasge:m});
    }).catch(err=>{
        console.log(err);
        m.message="Error while changing status";
        res.status(500).json({messasge:m});
    });

}

exports.changeStatusClass=(req,res,next)=>{
    let message=new Message();

    const id=req.params.id;
     console.log(id);
     var classes=req.body;
     if(classes.status=="Block") classes.status="Unblock";
   else if(classes.status=="Unblock") classes.status="Block";

     Class.findByIdAndUpdate(id,classes,{ upsert: true, new: true }).then((data)=>{
         data.save();
         m.message="Status of class is changed";
         res.status(200).json({messasge:m});

     }).catch(err=>{
        console.log(err);
        m.message="Error while changing status";
        res.status(500).json({messasge:m});
    });

}
