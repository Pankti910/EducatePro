import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClassList} from "../model/classList.model";
import { Message } from "../model/message.model";
import { ClassCreate } from "../model/classCreate.model";
@Injectable({providedIn:'root'})
export class ClassUserService{
    message!:Message
    private messageUpdate=new Subject<Message>();
    private classList!:ClassList;
    private classListUpdate=new Subject<ClassList>();
    private apiUrl="http://localhost:9000/class/";
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private http:HttpClient){}

    url1="http://localhost:9000/class/createClass"
    getClassList(){
        var userid=localStorage.getItem('userid')
        console.log(userid)
        this.http.get<{classList:any}>(`${this.apiUrl}/getClassList/${userid}`).subscribe((data)=>{
            //console.log(data.classList)
            this.classList=data.classList
           // console.log(data.classList)
            this.classListUpdate.next(this.classList)
        })
    }
   
    getClassListListner(){
        return this.classListUpdate.asObservable();
    }

    createClass(classCreate:ClassCreate){
        
        var request = new XMLHttpRequest();
        request.open('POST',this.url1,false)
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
        request.send(JSON.stringify(classCreate))
        var status=request.status
        this.getClassList()
        if(status==200||status==400){


            var obj=JSON.parse(request.response)
            console.log(obj)
            var msg=obj.message["message"]
            
            return msg
           

        }
        else{
            return "Error while submitting  response"
        }
    
 
     }
 
 
     classLeave(classid:String){
         return this.http.get<{message:Message}>(`${this.apiUrl}/leaveClass/${classid}/${localStorage.getItem('userid')}`).subscribe((data)=>{
            this.message=data.message
            this.messageUpdate.next(this.message)
         });
 
        }

      removeFromClass(classid:String,userid:String){
        return this.http.get<{message:Message}>(`${this.apiUrl}/leaveClass/${classid}/${userid}`).subscribe((data)=>{
            this.message=data.message
            this.messageUpdate.next(this.message)
         });
      }

        joinClass(classcode:String){
            return this.http.get<{message:Message}>(`${this.apiUrl}/joinClass/${classcode}/${localStorage.getItem('userid')}`).subscribe((data)=>{
                this.message=data.message
              
                this.messageUpdate.next(this.message)
                this.getClassList();
             });
        }
 
     getMessageUpdateListner(){
         return this.messageUpdate.asObservable();
     }
}