const multer = require("multer");
const {Class}=require('../Model/Class');
const {Assignment}=require('../Model/Assignment');
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

var storageAssign = multer.diskStorage({
    destination: function (req, file, cb) {
  
             cb(null,"./public/assignment/assignment-assign")
    },
    filename: function (req, file, cb) {
        filename="assignment-assign-"+Date.now()+"."+file.originalname.split(".")[1]
    
         cb(null,filename)
    }

  })

  var uploadAssignment = multer({ 
    
    storage: storageAssign
}).any("post");       




var storageSubmit = multer.diskStorage({
    destination: function (req, file, cb) {
  
             cb(null,"./public/assignment/assignment-submit")
    },
    filename: function (req, file, cb) {
        filename="assignment-submit-"+Date.now()+"."+file.originalname.split(".")[1]
    
         cb(null,filename)
    }

  })

  var uploadSubmit = multer({ 
    
    storage: storageSubmit
}).any("post"); 


exports.assignmentAssign=(req,res,next)=>{
   let m=new Message();
    classid=req.params.id;
    asssignmentNameData=req.params.assignment;
   
    uploadAssignment(req,res,function(err) {
   //     console.log(req.files[0].filename)
        if(err) {
            res.status(404).json(err)
        }
        else {
    
           assignment=new Assignment({classid:classid,assignmentName:req.params.assignment,assignmentDocument:req.files[0].filename});
           assignment.save().then((data)=>{
               Class.findById(mongoose.Types.ObjectId(classid)).then((dataClass)=>{
                   dataClass.assignments.push(data);
                   dataClass.save().then((res1)=>{
                                 
                    res.status(200).json(err);
                   })
               })
           })
        }
    })

}


exports.getAssignments=(req,res,next)=>{
   
    Assignment.find({classid:req.params.id},{}).then((data)=>{
        res.status(200).json({assignmentList:data})
    })
}

exports.downloadAssignmentQuestion=(req,res,next)=>{
   console.log(req.params.id);
    var file=process.cwd()+"\\public\\assignment\\assignment-assign\\";
    var id=req.params.id;

    Assignment.findById(mongoose.Types.ObjectId(id)).then((data)=>{
        file=file+data.assignmentDocument;
        res.download(file,'abc');
    })
}

exports.getAssignmentsSubmitted=(req,res,next)=>{
    aid=req.params.id;
    
    Assignment.findById(mongoose.Types.ObjectId(aid)).then((data)=>{
        res.json(({assignmentsSubmission:data}))
    })
}

exports.downloadSubmittedAssignment=(req,res,next)=>{

    sid=req.params.sid;
    aid=req.params.aid;
    console.log(sid)
    sid=String(sid);
    var file=process.cwd()+"\\public\\assignment\\assignment-submit\\";
    Assignment.findById(mongoose.Types.ObjectId(aid)).then((data)=>{
        var arr=data.studentsSubmission;
        
        var item=arr.filter(function(arr){return arr.students == sid})[0];
        file=file+item.file;
        res.sendFile(file,sid+"-"+aid)
    })
}

exports.submitAssignment=(req,res,next)=>{
    userid=req.params.userid;
    aid=req.params.id;
    let m=new Message();
    Assignment.findById(mongoose.Types.ObjectId(aid)).then((data)=>{
        var submissionArr=data.studentsSubmission.map(function(a){return a.students.toString()})
        if(submissionArr.indexOf(userid)!==-1){
            m.message=`Already submitted assignment`
            console.log(m)
            res.status(200).json({message:m})
        }
        else{
            uploadSubmit(req,res,function(err){
                filename=req.files[0].filename;
                console.log(filename);
                
                if(err){
                    m.message=`Assignment Not Submit`
                    console.log(m)
                    res.status(500).json({message:m})
                }
                else{
                    Assignment.findById(mongoose.Types.ObjectId(aid)).then((data)=>{
                        var student=Object.assign({students:userid,file:filename,submissionStatus
                            :"Done"});
                        var studentsSubmissionArr=data.studentsSubmission;
                        if(studentsSubmissionArr.indexOf(userid)!==-1){
                            console.log("Assignment Already Submitted")
                        }    
                        else{
                        data.studentsSubmission.push(student)
                        data.save().then((data1)=>{
                           // console.log(data1)
                            m.message=`Assignment Submitted Successfully`
                            console.log(m)
                            res.status(200).json({message:m})
                        })
                    }
                    })
                }
            })
        }
      
    })
    
}