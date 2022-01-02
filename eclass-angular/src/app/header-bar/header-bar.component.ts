import { Component } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Message } from "../model/message.model";
import { ClassUserService } from "../service/classUser.service";


@Component({
    selector:'header-bar',
    templateUrl:'./header-bar.component.html',
    styleUrls:['./header-bar.component.css']
})

export class HeaderBarComponent{
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    private MessageSub:Subscription=new Subscription;
    classcode!:String;
     color!:String;
      displayModeOfSetting:boolean=false;
      username!:any;
      showFiller = false;
      classname!:String;
      constructor(private router:Router,private classUserService:ClassUserService,private _snackBar: MatSnackBar){}
      ngOnInit(): void {
          this.username="Welcome  "+localStorage.getItem('name')
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
      this.displayStyle = "none";
  
    }
    closePopup1() {
      this.displayStyle1 = "none";
    }
    onClick(){
         
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
  
}