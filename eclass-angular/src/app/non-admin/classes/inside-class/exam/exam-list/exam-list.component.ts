import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ClassData } from "src/app/model/classData.model";
import { ClassList } from "src/app/model/classList.model";
import { ExamList } from "src/app/model/examList.model";
import { Message } from "src/app/model/message.model";
import { ClassDataService } from "src/app/service/classData.service";
import { ClassUserService } from "src/app/service/classUser.service";
import { ExamService } from "src/app/service/exam.service";

@Component({
    selector:'people',
    templateUrl:'./exam-list.component.html',
    styleUrls:['./exam-list.component.css']
})

export class ExamListComponent implements OnInit{
    constructor(private classService:ClassUserService,private route:ActivatedRoute,private router:Router,private classDataService:ClassDataService,private examService:ExamService){
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          };
    
    }
    id!:any
   
    examList!:ExamList;
    classData!:ClassData;
    message!:Message;
    classList!:ClassList;

    private classSub:Subscription=new Subscription;

    classcode:string='';
    value:string=''
    meetLink:string='https://secret-taiga-73367.herokuapp.com/';
    private classDataSub:Subscription=new Subscription;
    private examDataSub:Subscription=new Subscription;
    ngOnInit(): void {
       this.route.params.subscribe((params:Params)=>{
           this.id=params
           this.id=this.id["id"]
       })
       this.classDataService.getClassData(this.id)
       this.classDataSub=this.classDataService.getClassDataListner().subscribe((classData:ClassData)=>{
           this.classDataService.getMessageUpdateListner().subscribe((message:Message)=>{
               this.message=message
           })
           this.classData=classData
           this.value=this.classData.classcode.toString()
           this.meetLink=this.meetLink+classData._id
           
       })
       this.examService.getExamList(this.id);
       this.examDataSub=this.examService.getExamListUpdateListner().subscribe((data:ExamList)=>{
           this.examList=data;
          // alert(this.examList.exams[0].exam)
           //console.log(this.examList);
       })

    this.getClassList();

    }
    tabClick(tab:any) {
           if(tab.tab.textLabel=="Post"){
            this.router.navigate([`/inside-class/${this.id}`]);
        }
        if(tab.tab.textLabel=="Assignment"){
            this.router.navigate([`/assignment/${this.id}`])
        }
        if(tab.tab.textLabel=="People"){
            this.router.navigate([`/people/${this.id}`])
        }
      }
      examAdd(){
          this.router.navigate([`exam-add/${this.id}`])
      }

      getClassList(){
        this.classService.getClassList()
        this.classSub=this.classService.getClassListListner().subscribe((classList:ClassList)=>{
            this.classList=classList
        })
    }
}