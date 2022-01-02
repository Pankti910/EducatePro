const express=require("express");
const router=express.Router();
const classController=require('../Controller/classController');

router.post('/createClass',classController.createClass);
router.get('/joinClass/:classcode/:userid',classController.joinClass);
router.get('/getClassList/:id',classController.getClassList);
router.get('/getClassData/:id/:userid',classController.getClassData);
router.get('/leaveClass/:id/:userid',classController.leaveClass);
module.exports=router;