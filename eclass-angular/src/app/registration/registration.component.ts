import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Registration } from "../model/registration.model";
import { RegistrationService } from "../service/registration.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
    selector:'registration',
    templateUrl:'./registration.component.html',
    styleUrls:['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    
    registration!:Registration;
    fname!:String;
    lname!:String;
    email!:String;
    password!:String;
    constructor(private registrationService:RegistrationService,private router: Router,private _snackBar: MatSnackBar) { }
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
   
    ngOnInit() { 

        this.fname="";
        this.lname="";
        this.email="";
        this.password="";


    }

    onRegistration(){
        var obj=Object.assign({fname:this.fname,lname:this.lname,email:this.email,password:this.password})
        var msg=this.registrationService.registration(obj)
       // alert(msg)
        this.openSnackBar(msg)
        if(msg!=="You email is already register"){
           this.router.navigate(['/'])   
        }
    }
    openSnackBar(message: string) {
        this._snackBar.open(message,"Ok",{
            duration: 200,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
      }
}