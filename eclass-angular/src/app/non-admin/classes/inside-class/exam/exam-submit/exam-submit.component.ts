
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Exam } from 'src/app/model/exam.model';
import { ExamService } from 'src/app/service/exam.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { responseModel } from 'src/app/model/response.model';
import { examResponse} from 'src/app/model/examResponse.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

interface getExam{
    message:String,
    examQuestion:Exam
}
@Component({
    selector: 'selector',
    templateUrl: './exam-submit.component.html',
    styleUrls:['./exam-submit.component.css']
})
export class ExamSubmitComponent implements OnInit {

    constructor(private examService:ExamService,private _snackBar: MatSnackBar,private route:ActivatedRoute,private router:Router) {
        this.timer(2);
     }
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
   
    display: any;
    exam!:Exam;
    totalMarks:Number=0;
    responses:responseModel[]=[];
    private examSub:Subscription=new Subscription;
    examid:any;
    ngOnInit() { 

        this.route.params.subscribe((params:Params)=>{
            this.examid=params
            this.examid=this.examid["id"]
        })
    this.examService.getExamQuestions(this.examid)
    this.examSub=this.examService.getExamUpdateListner().subscribe((examQuestion:Exam)=>{
       
        this.exam=examQuestion
        if(this.exam!=null){
           
                this.totalMarks=0;
                for(let data of this.exam.queAndans){
               
                    this.totalMarks=parseInt(this.totalMarks.toString())+parseInt(data.marks.toString())
      
                
            }
            this.openSnackBar("Exam Start")
        }else{
            this.openSnackBar("We are facing issue while starting exam")
        }
    })

    //deserialize(this.data)
    }
    changeAnswer(questionid:String,optionSelect:String,i:number){
       // alert(this.responses.length)
        this.responses[i]=Object.assign({question:questionid,answer:optionSelect})
       // alert(this.responses.length)
    }

    openSnackBar(message: string) {
        this._snackBar.open(message,"Ok",{
            duration: 200,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
      }

      submitExam(){
        var userid=localStorage.getItem("userid")
         var examResponse=Object.assign({userid:userid,examid:this.examid,reponsesByUser:this.responses})
         var msg=this.examService.submitExam(examResponse)
         this.openSnackBar(msg)
      }
      timer(minute: number) {
          
        // let minute = 1;
        let seconds: number = minute * 60;
        let textSec: any = "0";
        let statSec: number =60;
        
    
        const timer = setInterval(() => {
           
          const prefix = minute < 10 ? "0" : "";
          seconds--;
          if (statSec != 0) {
            statSec--;
            console.log(statSec)

          }
          if(statSec==0){
            if(minute>0){
              minute--;
            }  
            if(statSec==0 && minute==0){
              this.submitExam();
            }
            
            console.log(minute)
            statSec=59;
              //alert(minute)
          }
           if(statSec==0 && minute==0) {
            alert("Time is over")
          }
          if (statSec < 10) {
            textSec = "0" + statSec;
          } else textSec = statSec;
    
          this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
    
        }, 1000);
      }

}