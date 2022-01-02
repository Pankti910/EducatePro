const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/EClassDB', { useNewUrlParser: true });

var db= mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


module.exports=mongoose;
