import { Component, OnInit } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Message } from "src/app/model/message.model";
import { User } from "src/app/model/user.model";
import { ClassUserService } from "src/app/service/classUser.service";
import{EditprofileService} from "src/app/service/editprofile.service"
@Component({
    selector:'main-headerbar',
    templateUrl:'./main-headerbar.component.html',
    styleUrls:['./main-headerbar.component.css']
})

export class MainHeaderBarComponent implements OnInit{
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  private MessageSub:Subscription=new Subscription;
  classcode!:String;
   color!:String;
   id!:String;
   password!:String;
    displayModeOfSetting:boolean=false;
    username!:any;
    showFiller = false;
    classname!:String;
    user!:User[];
    fname!:String;
    lname!:String;
    role!:String;
    constructor(private router:Router,private classUserService:ClassUserService,private EditprofileService:EditprofileService,private _snackBar: MatSnackBar){}
    ngOnInit(): void {
        this.username="Welcome  "+localStorage.getItem('name')
        this.role=localStorage.getItem('role');
    }

  displayStyle = "none";
  openPopup() {
    this.displayStyle = "block";
    this.displayStyle1="none";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  displayStyle1="none"

  openPopup1() {
    this.displayStyle1 = "block";
    this.displayStyle2 = "none";

  }
  closePopup1() {
    this.displayStyle1 = "none";
  }
  displayStyle2 = "none";
  
  openPopup2() {
    var data=localStorage.getItem('name');
    var data1=data.split(" ");
    console.log(data1);
    this.fname=data1[0];
    this.lname=data1[1];
    console.log(this.fname)
    this.displayStyle2 = "block";
    this.displayStyle1="none";
  }
  closePopup2() {
    this.displayStyle2 = "none";
  }
  displayStyle3 = "none";
  
  openPopup3() {
   
    this.displayStyle3 = "block";
    this.displayStyle2="none";
  }
  closePopup3() {
    this.displayStyle3 = "none";
  }
  
  changepassword(id:String){
    this.EditprofileService.Changepassword(id).subscribe(data=>{})
  }

  Edit(id:String){
    this.EditprofileService.EditProfile(id).subscribe(data=>{})
  }

  
    createNewClass(){
     var classCreate=Object.assign({classname:this.classname,classcolor:this.color,creatorOfclass:localStorage.getItem('userid')})
     var msg= this.classUserService.createClass(classCreate);
     this.openSnackBar(msg)
     this.displayStyle1 = "none";
      this.displayStyle = "none";
      if(!this.displayModeOfSetting){
       
           this.displayModeOfSetting=true;
       }
       else{
           this.displayModeOfSetting=false;
       }
    }

    joinClass(){
      this.classUserService.joinClass(this.classcode);
      this.classUserService.getMessageUpdateListner().subscribe((message:Message)=>{
        this.openSnackBar(String(message.message))
    });
      this.classcode="";
      this.displayStyle1 = "none";
      this.displayStyle = "none";
    }
    openSnackBar(message: string) {
      this._snackBar.open(message,"Ok",{
          duration: 200,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
      });
    }
    saveEdit(){
  
    }

    onLogout(){
      localStorage.clear();
      this.router.navigate(['/'])   
    }

}

function id(id: any) {
  throw new Error("Function not implemented.");
}