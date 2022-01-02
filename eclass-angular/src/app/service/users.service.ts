import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({providedIn:'root'})
export class UsersService{
  selectedUser!:User;
  selectedId!:string;
  private users:User[]=[];
  changeUserStatusmessage:string="";
  private userUpdated=new Subject<User[]>();
  private apiUrl="http://localhost:9000/admin";
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http:HttpClient){}
  
  getUsers(){
    return this.http.get<{message:string,users:User[]}>(this.apiUrl+"/getUsers").subscribe((data)=>{
        this.users=data.users;
        this.userUpdated.next([...this.users]);
    });
    //return [...this.users];
  }
  getUsersUpdateListener(){
    return this.userUpdated.asObservable();
  }

  changeUserStatus(id:String,user:User){
     return this.http.put(`${this.apiUrl}/changeStatusUser/${id}`,user,{observe: 'response'}).subscribe((data)=>{
 
       this.changeUserStatusmessage=data.status.toString();
       this.userUpdated.next([...this.users]);
       
     });
    }
}