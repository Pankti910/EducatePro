import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ClassData } from "src/app/model/classData.model";
import { ClassList } from "src/app/model/classList.model";
import { Message } from "src/app/model/message.model";
import { ClassDataService } from "src/app/service/classData.service";
import { ClassUserService } from "src/app/service/classUser.service";

@Component({
    selector:'people',
    templateUrl:'./people.component.html',
    styleUrls:['./people.component.css']
})

export class PeopleComponent implements OnInit{
    constructor(private route:ActivatedRoute,private router:Router,private classDataService:ClassDataService,private classService:ClassUserService){
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          };
    }
    id!:any
   
    private classSub:Subscription=new Subscription;
    classList!:ClassList;

  classData!:ClassData;
  message!:Message;

    classcode:string='';
    value:string=''
    meetLink:string='https://secret-taiga-73367.herokuapp.com/';
    private classDataSub:Subscription=new Subscription;
    ngOnInit(): void {
       this.route.params.subscribe((params:Params)=>{
           this.id=params
           this.id=this.id["id"]
       })
       this.classDataService.getClassData(this.id)
       this.classDataSub=this.classDataService.getClassDataListner().subscribe((classData:ClassData)=>{
           this.classDataService.getMessageUpdateListner().subscribe((message:Message)=>{
               this.message=message
               console.log(this.message)
           })
           this.classData=classData
           this.value=this.classData.classcode.toString()
           //console.log(classData)
           this.meetLink=this.meetLink+classData._id
           
       })
       //this.classcode=this.classData.classcode.toString()
       this.getClassList();

    }
    tabClick(tab:any) {
        //alert("Hello")
        if(tab.tab.textLabel=="Post"){
           //alert(tab.tab.textLabel)
            this.router.navigate([`/inside-class/${this.id}`]);
        }
        if(tab.tab.textLabel=="Assignment"){
            this.router.navigate([`/assignment/${this.id}`])
        }
        if(tab.tab.textLabel=="Exam"){
            this.router.navigate([`/exam/${this.id}`])
        }
      }

      getClassList(){
        this.classService.getClassList()
        this.classSub=this.classService.getClassListListner().subscribe((classList:ClassList)=>{
            this.classList=classList
          //  console.log(this.classList);
        })
    }
}