const express=require("express");
const router=express.Router();
const adminController=require('../Controller/adminController');

router.get('/getUsers',adminController.getUsers);
router.get('/getClasses',adminController.getClasses);
router.put('/changeStatusUser/:id',adminController.changeStatusUser);

router.put('/changeStatusClass/:id',adminController.changeStatusClass);
module.exports=router;