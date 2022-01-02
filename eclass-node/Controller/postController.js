const multer = require("multer");
const {Class}=require('../Model/Class');
const {Post}=require('../Model/Post');
const mongoose=require("mongoose");
const nodemailer = require("nodemailer");

const {User}=require('../Model/User')
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

var storageAssign = multer.diskStorage({
    destination: function (req, file, cb) {
  
             cb(null,"./public/Post")
    },
    filename: function (req, file, cb) {
        filename="Post-"+Date.now()+"."+file.originalname.split(".")[1]
    
         cb(null,filename)
    }

  })

  var uploadPost = multer({ 
    
    storage: storageAssign
}).any("post");       





 

exports.Addpost=(req,res,next)=>{


    console.log("Hello")
   let m=new Message();
    classid=req.params.id;
    userid=req.params.id1;

    Content=req.params.Content;
    console.log(req.params);

    uploadPost(req,res,function(err) {
        if(err) {
            res.status(404).json(err)
        }
        else {
    
           post=new Post({classid:classid,userid:userid,Content:req.params.Content,Document:req.files[0].filename});
           post.save().then((data)=>{
               console.log("hello")
               Class.findById(mongoose.Types.ObjectId(classid),{students:1,teachers:1,classname:1}).populate('students',{email:1}).populate('teachers',{email:1}).exec().then((dataClass)=>{
                   console.log(dataClass)
                   let teachers=dataClass.teachers;
                   let students=dataClass.students;
                   for(var i=0;i<teachers.length;i++){
                    if(userid!=teachers[i]._id){
                    sendMail(teachers[0].email,dataClass.classname, info => {
                        console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
                      });
                    }
                    if(userid!=students[i]._id){
                        sendMail(students[0].email,dataClass.classname, info => {
                            console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
                          });
                     }
                   }   
                })
           })
        }
    })

}


async function sendMail(user,data, callback) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user:  "aviradalsaniya@gmail.com",
        pass: "vmpbaqavdedoened"
      },
     
    });
  
    let mailOptions = {
      from: '" EducatePro', // sender address
      to: user, // list of receivers
      subject: "Classroom Post", // Subject line
      html: `<h1>Something Post On Classroom ${data} </h1><br>`
    };
  
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
  
    callback(info);
  }

exports.getPost=(req,res,next)=>{
   
    Post.find({classid:req.params.id},{}).then((data)=>{
        res.status(200).json({PostList:data})
    })
}

exports.downloadPost=(req,res,next)=>{
   console.log(req.params.id);
    var file=process.cwd()+"\\public\\Post\\";
    var id=req.params.id;

    Post.findById(mongoose.Types.ObjectId(id)).then((data)=>{
        file=file+data.Document;
        res.download(file,'abc');
    })
}


exports.deletepost=(req,res,next)=>{
    var id=req.params.id;
    Post.deleteOne(mongoose.Types.ObjectId(id)).then((data)=>{
        res.status(200).json({PostList:data})
    })
}