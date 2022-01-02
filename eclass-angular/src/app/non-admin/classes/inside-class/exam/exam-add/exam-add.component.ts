import { Component, OnInit } from "@angular/core";
import { examQueAndAns } from "src/app/model/examQueAndans.model";
import {Exam} from "src/app/model/exam.model";
import { ExamService } from "src/app/service/exam.service";
import { Subscription } from "rxjs";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from "@angular/router";

interface Options{
    value: string;
   viewValue: string;
}

@Component({
    selector:'exam-add',
    templateUrl:'./exam-add.component.html',
    styleUrls:['./exam-add.component.css']
})
export class ExamAddComponent implements OnInit{
    
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    private examSub:Subscription | undefined;
    options:Options[]=[
        {value:'option1',viewValue:'Option 1'},
        {value:'option2',viewValue:'Option 2'},
        {value:'option3',viewValue:'Option 3'},
        {value:'option4',viewValue:'Option 4'},

    ]
    responseMessage!:String;
    exam!:String;
    question!:String;
    option1!:String;
    option2!:String;
    option3!:String;
    option4!:String;
    correctAnswer!:String;
    marks!:Number;   
    questions:examQueAndAns[]=[];
    operation!:String;
    indexForUpdate!:number;
    totalMarks!:Number;
    class:any;


    constructor(private examService: ExamService,private _snackBar: MatSnackBar,private route:ActivatedRoute,private router:Router) { }


    ngOnInit(): void {
        this.route.params.subscribe((params:Params)=>{
            this.class=params
            this.class=this.class["id"]
        })
        this.question='';
        this.option1=' ';
        this.option2=' ';
        this.option3=' ';
        this.option4=' ';
        this.correctAnswer=' ';
        this.marks=1;
        this.operation="add";
        this.totalMarks=0;
    }

    onQuestionAdd(){
        var dataObj:examQueAndAns=Object.assign({question:this.question,option1:this.option1,option2:this.option2,option3:this.option3,option4:this.option4,correctAnswer:this.correctAnswer,marks:this.marks});
        this.questions.push(dataObj);
        
        this.resetFields();
        this.getTotalMarks();

    }

    removeQuestion(item:any,i:number){
         this.questions.splice(i,1)
         
        this.getTotalMarks();
    }

    editQuestion(item:examQueAndAns,i:number){
        
       
        this.question=item.question;
        this.option1=item.option1;
        this.option2=item.option2;
        this.option3=item.option3;
        this.option4=item.option4;
        this.correctAnswer=item.correctAnswer;
        this.marks=item.marks;
        this.operation="edit";
        this.indexForUpdate=i;
        

    }

    onUpdate(){
        var dataObj:examQueAndAns=Object.assign({question:this.question,option1:this.option1,option2:this.option2,option3:this.option3,option4:this.option4,correctAnswer:this.correctAnswer,marks:this.marks});
        this.questions[this.indexForUpdate]=dataObj;
        
        this.resetFields();
        
        this.getTotalMarks();
    }

    onDiscardUpdate(){
        this.resetFields();
    }
    resetFields(){
        this.question='';
        this.option1=' ';
        this.option2=' ';
        this.option3=' ';
        this.option4=' ';
        this.correctAnswer=' ';
        this.marks=1;
        this.operation="add";
    }

    onExamAssign(){
     
     if(this.questions.length>0 && this.exam!=undefined &&this.class!=undefined){
     var examObj=Object.assign({class:this.class,exam:this.exam,queAndans:this.questions,totalMarks:this.totalMarks});
    this.responseMessage=this.examService.setExam(examObj);
     this.openSnackBar(String(this.responseMessage));
     this.questions=[];
     this.exam='';
     this.resetFields();
     }
     
    }

    openSnackBar(message: string) {
        this._snackBar.open(message,"Ok",{
            duration: 200,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
      }

      getTotalMarks(){
          this.totalMarks=0;
          for(let data of this.questions){
         
              this.totalMarks=parseInt(this.totalMarks.toString())+parseInt(data.marks.toString())

          }
      }

      backToExamList(){
        this.router.navigate([`/exam/${this.class}`]);
      }
}