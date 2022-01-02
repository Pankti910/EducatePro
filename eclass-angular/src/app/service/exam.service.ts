import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import {Exam} from "../model/exam.model"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { examResponse} from "../model/examResponse.model";
import { ExamList } from "../model/examList.model";
import { ExamData } from "../model/examData.model";


@Injectable({providedIn:'root'})
export class ExamService{
    private apiUrl="http://localhost:9000/exam";
    private examData!:ExamData[];
    message!:String;
    private exam!:Exam;
    private examUpdate=new Subject<Exam>();
    private examListUpdate=new Subject<ExamList>();
    private examDataUpdate=new Subject<ExamData[]>();
    private examList!:ExamList;
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private http:HttpClient){}
    responseMessage!:String;
    

    getExamList(id:String){

        return this.http.get<{examList:ExamList}>(`${this.apiUrl}/examList/${id}`).subscribe((data)=>{
            this.examList=data.examList;
            this.examListUpdate.next(this.examList)
        })
    }


    getExamData(id:String){
        return this.http.get<{examData:ExamData[]}>(`${this.apiUrl}/getExamData/${id}`).subscribe((data)=>{
            this.examData=data.examData;
            this.examDataUpdate.next(this.examData);
        })
    }



    setExam(exam:Exam){


        var request = new XMLHttpRequest();
        request.open('POST',this.apiUrl+"/"+"setExam",false)
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
        request.send(JSON.stringify(exam))
        var status=request.status
        if(status==200||status==500){
            var obj=JSON.parse(request.response)
            var msg=obj.message["message"]
            return msg;

        }
        else{
            return "Error while assign exam"
        }
    
    }

    getExamQuestions(id:String){

       

    
        this.http.get<{message:String,examQuestion:Exam}>(this.apiUrl+"/getExamQuestion/"+id).subscribe((data)=>{
            
            this.exam=data.examQuestion;
            this.message=data.message;
           this.examUpdate.next(this.exam)  
      
           
        })
    }

    submitExam(responseUser:examResponse){
        var request = new XMLHttpRequest();
        request.open('POST',this.apiUrl+"/"+"submitExam",false)
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
        request.send(JSON.stringify(responseUser))
       // console.log(request.response)
       var status=request.status
        if(status==200){
            var obj=JSON.parse(request.response)
            console.log(obj)
            var msg=obj.message["message"]
            
            return msg;

        }
        else{
            return "Error while submitting  response"
        }
    

    }

    getExamUpdateListner(){
        return this.examUpdate.asObservable();
    }

    getExamDataUpdateListner(){
        return this.examDataUpdate.asObservable();
    }

    getExamListUpdateListner(){
        return this.examListUpdate.asObservable();
    }
}

