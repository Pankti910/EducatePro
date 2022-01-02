import { Component, OnInit} from "@angular/core";
import { Subscription } from "rxjs";
import { User } from "../../model/user.model";
import { UsersService } from "../../service/users.service";
import {Router} from '@angular/router';

@Component({
    selector:'admin-users',
    templateUrl:'./users.component.html',
    styleUrls:['./users.component.css']
})
export class UsersComponent implements OnInit {
    //users:User[]=[{_id:"abcc111",fname:"pankti",lname:"shah",email:"abc@",status:"un"},{_id:"abcc111",fname:"pankti",lname:"shah",email:"abc@",status:"un"}];
    users:User[]=[];
    allow!:String;
    userStatus:string | undefined;
    private userSub: Subscription = new Subscription;
    constructor(private usersService:UsersService,private router: Router){}
    message:string="111";
    flagForDisplay=0;
    ngOnInit(){
       const role=localStorage.getItem('role');
      
       if(role=="Admin") this.allow="Yes";
       else this.allow="No";
        this.getUsers();
        this.userStatus="All";
    }

    getUsers(){
        this.usersService.getUsers();
        this.userSub=this.usersService.getUsersUpdateListener().subscribe((users:User[])=>{
            this.users=users;
        });
    }
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

    logout(){
        
        localStorage.removeItem("role");
        console.log("Destroy");
    }
    changeStatusOfUser(_id:String,item:User){
        //alert("hey");
        this.usersService.changeUserStatus(_id,item);
        this.message="Hello";
        this.flagForDisplay=1;
        this.getUsers();   
    }
    getUsersByStatus(val:any){
        this.userStatus=val;
       
    }
    tabClick(tab:any) {
        if(tab.tab.textLabel!="Users"){
           
            this.router.navigate(['/admin-classes']);
        }
      }
      redirectToPage(){
          
          if(localStorage.getItem('role')==null){
              this.router.navigate(['/']);
          }
          else{
            this.router.navigate(['/class-list']);
          }
      }
}