import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginCredential } from '../model/login.model';
import { LoginService } from '../service/login.service';
import {Router} from '@angular/router';
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls:['./login.component.css']
})
export class LoginComponent implements OnInit {
   wrong='0';
    rememberme:Boolean=false;
    login!:LoginCredential;
    username!:string;
    password!:string;
    constructor(private loginService:LoginService,private router: Router) { }

    ngOnInit() { 
      this.username="";
      this.password="";
      const role=localStorage.getItem('role');
    
      if(role=="Admin")
    {
       
       this.router.navigate(['/admin-users']);
    }
    else if(role=="Non-Admin"){
       this.router.navigate(['/class-list']);
    }
    }





    onLogin(){
    
        if(this.username!=null && this.username!=undefined){

        
         const d:LoginCredential=Object.assign({email:this.username,password:this.password});
         this.loginService.login(d);
         localStorage.setItem('remember-me',String(this.rememberme));

         setTimeout(()=>{  

          const role=localStorage.getItem('role');
      //    alert(localStorage.getItem('userid'))
          if(localStorage.getItem('userid')!=undefined && localStorage.getItem('userid')!=null )
        {
         // this.wrong=1;
         if(role=="Admin")
         {
            
            this.router.navigate(['/admin-users']);
         }
         else if(role=="Non-Admin"){
            this.router.navigate(['/class-list']);
         }
        }
        else{
         this.wrong='1';
      }}
       ,400);
        
    }
  }

}