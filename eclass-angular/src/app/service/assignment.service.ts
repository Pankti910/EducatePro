import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  GetAssignmentList } from '../model/assignment.model';
import { Subject } from 'rxjs';
import { AssignmentSubmitted } from '../model/assignmentSubmitted.model';
@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private assignments!:GetAssignmentList[];
  private baseUrl = 'http://localhost:9000/assignment';
  private assignmentUpdate=new Subject<GetAssignmentList[]>();
  private assignmentSubmittedUpdate=new Subject<AssignmentSubmitted>();
  private assignmentSubmitted!:AssignmentSubmitted;

  constructor(private http: HttpClient) { }


  assignmentSubmittedList(id:String){
   
    return this.http.get<{assignmentsSubmission:AssignmentSubmitted}>(`${this.baseUrl}/getAssignmentsSubmitted/${id}`).subscribe((data)=>{
      this.assignmentSubmitted=data.assignmentsSubmission;
      this.assignmentSubmittedUpdate.next(this.assignmentSubmitted);
    })
  }

  assignmentAssign(formData:FormData,assignmentname:String,id:String): Observable<any>  {
   

    return this.http.post(`${this.baseUrl}/assignmentAssign/${id}/${assignmentname}`,formData,{
      reportProgress:true,observe:"events"
    })
  }


  assignmentSubmit(formData:FormData,aid:String): Observable<any>  {
   
   
    return this.http.post(`${this.baseUrl}/assignmentSubmission/${aid}/${localStorage.getItem('userid')}`,formData,{
      reportProgress:true,observe:"events"
    
    },
    
    )
  }
  

  getAssignments(classid:String){

    return this.http.get<{assignmentList:GetAssignmentList[]}>(`${this.baseUrl}/getAssignments/${classid}`).subscribe((data)=>{
      this.assignments=data.assignmentList;
      // var asssign=this.assignments[0]['studentsSubmission']
      // console.log(asssign[0]) 
      this.assignmentUpdate.next(this.assignments);
     
    })

    
  }

  downloadAssignmentQuestion(id:String){
   //   console.log(id); 
      return this.http.get(`${this.baseUrl}/downloadAssignmentQuestion/${id}`,{responseType:`blob`})
   }


   downloadAssignmentSubmission(sid:String,aid:String){
    return this.http.get(`${this.baseUrl}/downloadSubmittedAssignment/${sid}/${aid}`,{responseType:`blob`})

   }

   getAssignmentListListner(){
    return this.assignmentUpdate.asObservable();
}

getAssignmentSubmittedListner(){
  return this.assignmentSubmittedUpdate.asObservable();
}





}
