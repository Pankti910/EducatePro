import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import { Classes } from "../model/classes.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({providedIn:'root'})
export class ClassesService{
    private classes:Classes[]=[];
    private classesUpdate=new Subject<Classes[]>();
    private apiUrl="http://localhost:9000/admin";
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private http:HttpClient){}
 
    getClasses(){
        return this.http.get<{message:String,classes:Classes[]}>(this.apiUrl+"/getClasses").subscribe((data)=>{
            this.classes=data.classes;
           // alert(this.classes[0]. creatorOfclass.fname);
            this.classesUpdate.next([...this.classes]);
        });


    }
 
    
    getClassesUpdateListner(){
        return this.classesUpdate.asObservable();
    }

    

   
    changeStatusClass(id:String,classes:Classes){
     
          return this.http.put(`${this.apiUrl}/changeStatusClass/${id}`,classes,{observe: 'response'}).subscribe((data)=>{
              this.classesUpdate.next([...this.classes]);
          });
    }


    

   
}