const express=require("express");
const { model } = require("mongoose");
const router=express.Router();
const postController=require('../Controller/postController');

router.post('/Postadd/:id/:Content', postController.Addpost);
router.get('/getPost/:id',postController.getPost);
router.get('/downloadPost/:id',postController.downloadPost);
router.get('/deletepost/:id',postController.deletepost);

module.exports=router;