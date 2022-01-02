const express=require("express");
const router=express.Router();
var examController=require('../Controller/examController');

// router.post('/setExamQueAns',examController.setExamQuestionAnswer);
 router.post('/setExam',examController.setExam);
 router.post('/submitExam',examController.submitExam);
 router.get('/getExamQuestion/:id',examController.getExamQuestion);
 router.get('/getExamData/:id',examController.getExamData);
 router.get('/examList/:id',examController.getExamList);
//router.post('/',commonController.login);

module.exports=router;