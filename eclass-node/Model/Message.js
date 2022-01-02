const { model } = require("mongoose");
class Message{
  message=null;
  constructor(){}
  set message(message){
    this.message=message;
  }
  get message(){
      return this.message;
  }
}
module.exports=Message;