const express=require("express");
const { model } = require("mongoose");
const router=express.Router();
const assignmentController=require('../Controller/assignmmentController');

router.post('/assignmentAssign/:id/:assignment',assignmentController.assignmentAssign);
router.get('/getAssignments/:id',assignmentController.getAssignments);
router.post('/assignmentSubmission/:id/:userid',assignmentController.submitAssignment);
router.get('/downloadAssignmentQuestion/:id',assignmentController.downloadAssignmentQuestion);
router.get('/downloadSubmittedAssignment/:sid/:aid',assignmentController.downloadSubmittedAssignment);
router.get('/getAssignmentsSubmitted/:id',assignmentController.getAssignmentsSubmitted);
module.exports=router;