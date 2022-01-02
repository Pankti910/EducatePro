const express=require('express');
const debug=require("debug")("node-angular");
var bodyParser = require('body-parser');

const cors=require("cors")    

const mongoose=require('mongoose');
const app=express();
const PORT=process.env.PORT || 9000;
const postRoute=require('./Route/PostRoute');

const adminRouter=require('./Route/adminRoute');
const commonRoute=require('./Route/commonRoute');
const roleRoute=require('./Route/roleRoute');
const classRoute=require('./Route/classRoute');
const examRoute=require('./Route/examRoute');
const assignmentRoute=require('./Route/assignmentRoute');
const session = require('express-session');
mongoose.connect('mongodb://localhost:27017/EClassDB').then(()=>{console.log("db connected")});


app.listen(PORT,()=>console.log('Server start at port 9000'));


app.use(bodyParser.json({type:"application/json"}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors())
//app.use((req,res,next)=>{
// res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-with, Content-Type, Accept"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, DELETE, OPTIONS , PUT "
//   );
//   next();
// });
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  
  cookie: { secure: false,maxAge:Date.now()+(60*60*7*24*30) }
}))
app.use('/',commonRoute);
app.use('/role',roleRoute);
app.use('/admin',adminRouter);
app.use('/class',classRoute);
app.use('/exam',examRoute);
app.use('/assignment',assignmentRoute);
app.use('/post',postRoute);