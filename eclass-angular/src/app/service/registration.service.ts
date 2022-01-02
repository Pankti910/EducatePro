import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Registration } from '../model/registration.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../model/message.model';


@Injectable({providedIn:'root'})
export class RegistrationService{

    m:Message | undefined;
    private apiUrl="http://localhost:9000/signup";
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http:HttpClient){}
    registration(registrationData:Registration){
       
        var request = new XMLHttpRequest();
        request.open('POST',this.apiUrl,false)
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
        request.send(JSON.stringify(registrationData))
        var status=request.status
        if(status==200||status==400){


            var obj=JSON.parse(request.response)
            console.log(obj)
            var msg=obj.message["message"]
            
            return msg
            // var obj=JSON.parse(request.response)
            // var msg=obj.message["message"]
            
            // return msg;

        }
        else{
            return "Error while submitting  response"
        }
    

    
    }
}