
import { Component, OnInit } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ClassList } from "src/app/model/classList.model";
import { Message } from "src/app/model/message.model";
import { ClassUserService } from "src/app/service/classUser.service";

@Component({
    selector:'class-list',
    templateUrl:'./class-list.component.html',
    styleUrls:['./class-list.component.css']

})

export class ClassListComponent implements OnInit{
 
    allow!:String;
    classList!:ClassList;
    private classSub:Subscription=new Subscription;
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
   
    constructor(private router: Router,private _snackBar: MatSnackBar,private classService:ClassUserService){}
    ngOnInit(): void {
        
        const role= localStorage.getItem('role');;
        if(role==null){
            this.router.navigate(['/']);
        }
        if(role=="Non-Admin"){
            this.allow="Yes";
            this.getClassList()

        } 
        else this.allow="No";
    }
    counter(i: number) {
        return new Array(i);
    }
      redirectToPage(){
          
        if(localStorage.getItem('role')==null){
            this.router.navigate(['/']);
        }
        else{
          this.router.navigate(['/admin-users']);
        }
    }




    getClassList(){
        this.classService.getClassList()
        this.classSub=this.classService.getClassListListner().subscribe((classList:ClassList)=>{
            this.classList=classList
        })
    }

    leaveClass(classid:String){
      
      this.classService.classLeave(classid)
      this.classSub=this.classService.getMessageUpdateListner().subscribe((data:Message)=>{
          var data1:string=String(data.message)
          this.openSnackBar(data1);
          this.getClassList()
      })
    }
 

    openSnackBar(message: string) {
        this._snackBar.open(message,"Ok",{
            duration: 1000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
      }
}