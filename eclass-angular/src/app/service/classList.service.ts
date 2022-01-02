import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClassList} from "../model/classList.model";
@Injectable({providedIn:'root'})
export class ClassListService{
    
    private classList!:ClassList;
    private classListUpdate=new Subject<ClassList>();
    private apiUrl="http://localhost:9000/class/getClassList";
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private http:HttpClient){}

    getClassList(){
       // alert("ClassList")
        var userid=localStorage.getItem('userid')
        console.log(userid)
        this.http.get<{classList:any}>(`${this.apiUrl}/${userid}`).subscribe((data)=>{
            //console.log(data.classList)
            this.classList=data.classList
           // console.log(data.classList)
            this.classListUpdate.next(this.classList)
        })
    }
   
    getClassListListner(){
        return this.classListUpdate.asObservable();
    }
}