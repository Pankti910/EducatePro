const express=require("express");
const router=express.Router();
const commonController=require('../Controller/commonController');

// router.get('/',function(req,res){
//     roleController.getRoles
// });
// router.post('/',function(req,res){
//     roleController.addRole
// });

router.post('/',commonController.login);
router.post('/signup',commonController.signup);
router.get('/logout',commonController.logout);
router.get('/',commonController.createDirectory);
router.post('/EditProfile/:id',commonController.EditProfile);
router.post('/Changepassword/:id',commonController.Changepassword);
router.get('/EditProfileData/:id',commonController.EditProfileData);
module.exports=router;