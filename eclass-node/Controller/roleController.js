var {Role} = require('../Model/Role');


exports.addRole=(req,res,next)=>{
    console.log('add role called');
    var newRole=new Role({rolename:req.body.rolename,users:[]});
    newRole.save((err,docs)=>{
        if(err) res.status(500).json({message:`Error occur during adding class`});
        res.status(200).json({message: `New role is successfully added`});
        console.log(docs);
    });
}

exports.getRoles=(req,res,next)=>{
    Role.find((err,docs)=>{
      if(err) return res.status(500).send({message:`Error occur while retriving data`});
      res.status(200).send(docs);
    });
}

exports.getUsersByRole=(req,res,next)=>{

}
