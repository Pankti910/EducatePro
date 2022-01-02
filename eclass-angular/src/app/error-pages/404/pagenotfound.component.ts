import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector:'pagenotfound',
    templateUrl:'./pagenotfound.component.html',
    styleUrls:['./pagenotfound.component.css']   
})


export class PageNotFoundComponent{
    constructor(private router: Router){}
    onGoBackPage(){
        if(localStorage.getItem('role')==null){
            this.router.navigate(['/']);
        }
        if(localStorage.getItem('role')=='Non-Admin'){
            this.router.navigate(['/class-list']);
        }
        else if(localStorage.getItem('role')=='Admin'){
          this.router.navigate(['/admin-users']);
        }
    }
}