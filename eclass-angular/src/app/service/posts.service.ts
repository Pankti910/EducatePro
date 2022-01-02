import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  Posts } from '../model/Post.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts!:Posts[];
  private baseUrl = 'http://localhost:9000/post';
  private postupdate=new Subject<Posts[]>();
   

  constructor(private http: HttpClient) { }

  Addpost(formData:FormData,Content:String,id:String,id1:String): Observable<any>  {
    
    return this.http.post(`${this.baseUrl}/Postadd/${id}/${Content}`,formData,{
      reportProgress:true,observe:"events"
    })
  }


  

  getPost(id:String){

    return this.http.get<{PostList:Posts[]}>(`${this.baseUrl}/getPost/${id}`).subscribe((data)=>{
      this.posts=data.PostList;
     
      this.postupdate.next(this.posts);
     
    })
  }

  downloadPost(id:String){
      console.log(id); 
      return this.http.get(`${this.baseUrl}/downloadPost/${id}`,{responseType:`blob`})
   }
   deletepost(id:String){
    console.log(id); 
    return this.http.get(`${this.baseUrl}/deletepost/${id}`,{responseType:`blob`})
 }
   getPostListListner(){
    return this.postupdate.asObservable();
}





}
