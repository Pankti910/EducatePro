import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  User } from '../model/user.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EditprofileService {

  private posts!:User[];
  private baseUrl = 'http://localhost:9000/';
   

  constructor(private http: HttpClient) { }

  EditProfile(id:String): Observable<any>  {
      return this.http.post(`${this.baseUrl}/EditProfile/${id}/`,{responseType:`blob`})
  }


  

  Changepassword(id:String): Observable<any>  {
    return this.http.post(`${this.baseUrl}/Changepassword/${id}`,{responseType:`blob`})
  }
     


}