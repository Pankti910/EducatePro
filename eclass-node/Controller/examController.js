var {User}=require('../Model/User');
var {Class}=require('../Model/Class');
var {Exam}=require('../Model/Exam');
var {ExamResponse}=require('../Model/ExamResponse');

const mongoose=require("mongoose");
const { response } = require('express');

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


exports.setExam=(req,res,next)=>{
    
    var e=new Exam(req.body)
    let m=new Message()

    e.save().then((data)=>{
        var class_id=req.body.class;
        Class.findById(class_id).then((classData)=>{
            classData.exams.push(e);
            classData.save().then((data1)=>{
                m.message="Exam assign to students"
                res.status(200).json({message:m})
            })
        })

       
    }).catch(err=>{
      m.message="Error while assign exam"  
      res.status(500).json({message:m})
    })
    
}
exports.getExamQuestion=(req,res,next)=>{
    const id=req.params.id
    let m=new Message()
    m.message=`Exam start`
    Exam.findById(id).then((data)=>{
        res.status(200).json({message:`Exam start`,examQuestion:data})
    }).catch((err)=>{
       m.message= `Error while starting exam`
       res.status(500).json({message:`Error while fetching exam questions`,examQuestion:[]})
    })
}

exports.submitExam=(req,res,next)=>{
    let m=new Message()
   var tMarks=0
    var marksData=[]
    var dataUser=req.body.reponsesByUser
    
    ExamResponse.findOne({examid:req.body.examid,userid:req.body.userid}).then((data)=>{
           if(data==null){
              
    Exam.findById(req.body.examid).then((data)=>{
        examData=data
    }).then((data1)=>{
        var examArr= examData.queAndans
       dataUser.forEach(element1=>{
           examArr.forEach(element2=>{
               if(element1.question==element2._id){
                   tMarks+=element2.marks
                if(element1.answer==element2.correctAnswer){
                      const dataObj={question:element1.question,answer:element1.answer, correctOrWrongAns:1, marks:element2.marks}
                      marksData.push(dataObj)    
                   }
                   else{
                    const dataObj={question:element1.question,answer:element1.answer, correctOrWrongAns:0, marks:0}
                    marksData.push(dataObj)  
                   }
               }
           })
       })
    }).then((data3)=>{
        var userResponse=new ExamResponse({userid:req.body.userid,examid:req.body.examid,reponsesByUser:marksData,totalMarks:tMarks,getMarks:marksData.reduce((accumulator, current)=>accumulator + current.marks, 0)})
        userResponse.save().then((data3)=>{
            m.message="Your response submitted successfully"
            res.status(200).json({message:m})
        })
    }).catch((err)=>{
        m.message="Error while submitting response"
        res.status(500).json({message:m})
    })
           }else{
               m.message=`Your response already submitted`
               res.status(200).json({message:m})
           }
    })



      
    
}


exports.getExamList=(req,res,next)=>{
const classid=req.params.id;
Class.findById(mongoose.Types.ObjectId(classid),{exams:1}).populate('exams',{exam:1,totalMarks:1}).exec().then((data)=>{
    
    res.status(200).json({examList:data})
})
}

exports.getExamData=(req,res,next)=>{
    ExamResponse.find({examid:req.params.id},{userid:1,totalMarks:1,getMarks:1}).populate('userid',{fname:1,lname:1,email:1}).exec().then((data)=>{
        res.json({examData:data});
    })
}