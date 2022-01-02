import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import { LoginCredential } from "../model/login.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from "../model/message.model";


@Injectable({providedIn:'root'})
export class LoginService{
    m:Message | undefined;
    accessLogin!:string;
    private apiUrl="http://localhost:9000/";
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private http:HttpClient){}

    login(loginCredential:LoginCredential){
        return this.http.post<{message:Message}>(this.apiUrl,loginCredential,{observe: 'response'}).subscribe((data)=>{
                //this.m=data.body?.message;
                //alert(data["message"]);
                var obj=Object(data.body);
                var mObj=obj["messasge"]; 
                var role=Object(mObj)["messageRole"];
                var name=Object(mObj)["messageName"];
                var id=Object(mObj)["messageId"];
              
                    localStorage.setItem('role', role);
                    localStorage.setItem('name', name);
                    localStorage.setItem('userid',id);
              //  }
               
                
            });
   
        }

        getDataForUpdate(){
           this.http.get(`${this.apiUrl}getDataForUpdate/${localStorage.getItem('userid')}`).subscribe((data)=>{
               // console.log(datauserData);
            })
        }
 
}