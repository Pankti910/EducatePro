import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClassData } from "../model/classData.model";
import { Message } from "../model/message.model";
@Injectable({providedIn:'root'})
export class ClassDataService{
    
    private classData!:ClassData;
    private message!:Message;
    private classDataUpdate=new Subject<ClassData>();
    private messageUpdate=new Subject<Message>();
    private apiUrl="http://localhost:9000/class/getClassData";
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private http:HttpClient){}

    getClassData(classid:any){
        var userid=localStorage.getItem('userid')
        
        this.http.get<{message:Message,classData:ClassData}>(`${this.apiUrl}/${classid}/${userid}`).subscribe((data)=>{
            this.message=data.message;
            this.classData=data.classData;
         //  console.log(data)
            this.classDataUpdate.next(this.classData)
            this.messageUpdate.next(this.message)
        })
    }
   
    getClassDataListner(){
        return this.classDataUpdate.asObservable();
    }
    getMessageUpdateListner(){
        return this.messageUpdate.asObservable();
    }
}