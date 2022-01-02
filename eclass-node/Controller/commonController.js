var {User}=require('../Model/User');
var {Role}=require('../Model/Role');
const mongoose=require("mongoose");
var fs = require('fs');
var dir = './public/tmp';
class Message{
  message=null
  constructor(){}
  set message(message){
    this.message=message
  }
  get message(){
      return this.message
  }
}

class MessageLogin{
  messageRole=null;
  messageId=null;
  messageName=null;
  constructor(){}

  set messageRole(messageRole){
    this.messageRole=messageRole
  }
  get messageRole(){
    return this.messageRole
  }

  set messageId(messageId){
    this.messageId=messageId;
  }
  get messageId(){
      return this.messageId;
  }
  set messageName(messageName){
    this.messageName=messageName;
  }
  get messageName(){
      return this.messageName;
  }

}
exports.signup=(req,res,next)=>{
    
    
     User.find({}).then((res1)=>{
         var count=res1.length;
        
         var fname=req.body.fname;
         var lname=req.body.lname;
         var email=req.body.email;
         var password=req.body.password;
          var role_id=undefined;
          let m=new Message()

         if(count<0){

            Role.findOne({rolename:'Admin'}).then((res2)=>{
           
              var newUser=new User({fname:fname,lname:lname,email:email,password:password,role:res2._id});
              newUser.save().then((data)=>{
                res2.users.push(newUser)
                res2.save().then((res3)=>{
                //  console.log(res3)
                  m.message="You are register as Admin successfully"
                  res.status(500).json({message:m})
                })
              })

            })
         }
         else{
          Role.findOne({rolename:'Non-Admin'}).then((res1)=>{
            var newUser=new User({fname:fname,lname:lname,email:email,password:password,role:res1._id});
            newUser.save().then((savedUser)=>{
               res1.users.push(newUser)
               res1.save().then((savedRole)=>{
                m.message="You are register successfully"
                res.status(200).json({message:m})
               })
            }).catch((err)=>{
              if(err.name==="MongoServerError" && err.code=="11000")
              m.message="You email is already register"
              res.status(400).json({message:m})
            })
          })

         }
        })
     
}





exports.login=(req,res,next)=>{
  //console.log(req.body)
  let m=new MessageLogin();
   
     
      var email=req.body.email;
      var password=req.body.password;
     
    User.findOne({email:email,password:password}).then((data)=>{
   
      if(data!=null)
      {
    
      Role.findById(data.role).then((result)=>{
         sess = req.session;
         sess.userid=data._id;
         sess.role=result.rolename;
         
         m.messageRole=result.rolename;
         m.messageId=data._id;
         m.messageName=data.fname+" "+data.lname;
        
         res.status(200).json({messasge:m});
  
      }).catch(err=>console.log(err));
         }
      else{
        m.message="Login Credential Wrong";
        m.messageRole=0;
         m.messageId=0;
         m.messageName=0;
        res.status(200).json({message:m});
        
      }
      
    }).catch(err=>console.log(err));
//  }
}

exports.createDirectory=(req,res,next)=>{
var fileCopy='./public/assignment/assignment-submit/assignment-submit-1639855734093.png'
//  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
    dir=dir+"/assignment-submit-1639855734093.png"
    fs.copyFile(fileCopy,dir, function(err) {
      if (err) {
        throw err
      } else {
        console.log("Successfully copied and moved the file!")
      }
    })
//}
}


exports.logout=(req,res,next)=>{
  console.log(req.session.role)
  req.session.destroy()
  console.log(req.session)
  
}

exports.EditProfileData=(req,res,next)=>{
  User.findById(mongoose.Types.ObjectId(req.params.id),{fname:1,lname:1}).then((data)=>{
      res.status(200).json({ediProfileData:data})
  }).catch((err)=>{
    req.flash('No data found')
  })
}

exports.EditProfile=(req,res,next)=>{
  User.findById(req.params.id, function (err, user) {


    if (!user) {
        req.flash('error', 'No account found');
        console.log("No Uer")
    }

    var fname = req.body.fname;
    var lname = req.body.lname;

    if (!fname || !lname) { 
        req.flash('error', 'One or more fields are empty');
        console.log("error")
    }

    user.fname = fname;
    user.lname = lname;

    user.save(function (err) {

      console.log("no error")
    });
});
}

exports.Changepassword=(req,res,next)=>{
  User.findById(req.params.id, function (err, user) {


    if (!user) {
        req.flash('error', 'No account found');
        console.log("No Uer")
    }

    var password = req.body.password;

    if (!password) { 
        req.flash('error', 'One or more fields are empty');
        console.log("error")
    }

    user.password= password;
  
    user.save(function (err) {

      console.log("no error")
    });
});
}