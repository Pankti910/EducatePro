const express=require("express");
const router=express.Router();
const roleController=require('../Controller/roleController');

// router.get('/',function(req,res){
//     roleController.getRoles
// });
// router.post('/',function(req,res){
//     roleController.addRole
// });

router.get('/',roleController.getRoles);
router.post('/',roleController.addRole);
module.exports=router;