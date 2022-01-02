var randomString = require('randomstring');
var {User}=require('../Model/User');
var {Class}=require('../Model/Class');

const mongoose=require("mongoose");

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

exports.createClass=(req,res,next)=>{
   
    const classcode=randomString.generate({length:6});
    let m=new Message()
   var classCreate=new Class({
        classname:req.body.classname,
        classcolor:req.body.classcolor,
        classcode:classcode,
        creatorOfclass:req.body.creatorOfclass,
        teachers:new Array(req.body.creatorOfclass)});

        classCreate.save().then((res1)=>{
            User.findById(mongoose.Types.ObjectId(res1.creatorOfclass),(err,res2)=>{
                res2.joinedClasses.push(res1)
                res2.save().then((data1)=>{
                    m.message="Class Created Successfully"
                    res.status(200).json({message:m})
                })
            })
        })
       

}

exports.addTeacher=(req,res,next)=>{
    const teacherToadd=User.findById(req.body.userid);
    const teacherInclass=Class.findById(req.body.classId);
    teacherToadd.joinedClasses.push(teacherInclass);
    teacherToadd.save().then((teachAdded)=>{
        teacherInclass.teachers.push(teachAdded);
        teacherInclass.save((err,docs)=>{
            if(err) res.status(404).json({message:`Error occur during adding teacher in class ${teacherInclass.classname}`});
            res.status(200).json({message:`${teachAdded.fname} added in class ${docs.classname}`});
        })
    });
    

}

exports.joinClass=(req,res,next)=>{
  
    user=req.params.userid;
    classcode=req.params.classcode;
   //http://localhost:9000/class/joinClass/61bda11a4076c8b72c1011ed/rjtghwjrhjwh4r
//    console.log(req.params);

    let m=new Message();
    //res.status(200);
    if(user!=null || user!=undefined)
    {
        Class.find({classcode:classcode}).then((getClass)=>{

            var teacherList=getClass[0].teachers;
            var studentList=getClass[0].students;
            if(teacherList.indexOf(user)!==-1)
            {
                m.message=`Already join as teacher`
                res.status(200).json({message:m});
            }
            else if(studentList.indexOf(user)!==-1)
            {
                m.message=`Already join as student`
                res.status(200).json({message:m});
            }
            else{
               
            
                getClass[0].students.push(user);
                getClass[0].save().then((studentJoinClass)=>{
                   User.findById(user).then((getStudent)=>{
                      getStudent.joinedClasses.push(getClass[0]);
                      getStudent.save();
                      m.message=`Joined Class Successfully`
                      res.status(200).json({message:m});
                   }).catch(err=>{console.log(err)});
                }).catch(err=>{console.log(err)});
              
            
            }
                             
            
    
          });
      }
}



exports.getClassList=(req,res,next)=>{
  
    const userid=req.params.id;

    //console.log(userid)
    User.findById(mongoose.Types.ObjectId(userid),{joinedClasses:1}).populate('joinedClasses',{classname:1,status:1,classcolor:1}).exec().then((data)=>{
    
        res.status(200).json({classList:data})
    })
}

exports.getClassData=(req,res,next)=>{
    let m=new Message()
    const classid=req.params.id;
    //const userid="61a4689c367d4685e5773239"
    const userid=req.params.userid
//    console.log(classid)
    Class.findById(mongoose.Types.ObjectId(classid)).populate('teachers',{fname:1,lname:1,email:1}).populate('students',{fname:1,lname:1,email:1}).exec().then((data)=>{
     
        var teacherArr=data.teachers.map(function(a){return a._id.toString()})
        var studentArr=data.students.map(function(a){return a._id.toString()})
    
        if(teacherArr.indexOf(userid)!==-1){
            
             m.message="Teacher"
        }
        else if(studentArr.indexOf(userid)!==-1){
            m.message="Student"
        }
        else{
            m.message="None"
        }
        //m.message="None"
        res.status(200).json({message:m,classData:data})
    })
}

exports.leaveClass=(req,res,next)=>{
    
    userid=req.params.userid;
    classid=req.params.id;
    let m=new Message()


    Class.findById(mongoose.Types.ObjectId(classid)).then((data)=>{
          if(data.teachers.indexOf(userid)!==-1){
            
              data.teachers.pull(userid)
          }
          if(data.students.indexOf(userid)!==-1){
              data.students.pull(userid)
          }
          data.save().then((data1)=>{
            User.findById(mongoose.Types.ObjectId(userid)).then((userdata)=>{
                userdata.joinedClasses.pull(classid)
                userdata.save().then((data1)=>{

                    m.message="Leave class"
                    res.status(200).json({message:m}) 
                })
            }) 
          })
    
    })
}