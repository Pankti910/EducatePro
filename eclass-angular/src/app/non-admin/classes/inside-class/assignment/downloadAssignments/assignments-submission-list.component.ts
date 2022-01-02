import { Component } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AssignmentSubmitted } from "src/app/model/assignmentSubmitted.model";
import { ClassData } from "src/app/model/classData.model";
import { Message } from "src/app/model/message.model";
import { AssignmentService } from "src/app/service/assignment.service";
import { ClassDataService } from "src/app/service/classData.service";
import { saveAs } from "file-saver";

@Component({
    selector:'download-assignments',
    templateUrl:'./assignments-submission-list.component.html',
    styleUrls:['./assignments-submission-list.component.css']
})
export class AssignmentSubmissionComponent{
    message!:Message;

    ids:any;
    aid:any;
    classid:any;
    assignmentSubmission!:AssignmentSubmitted;
    classData!:ClassData;
    submittedData!:String[];
    private classDataSub:Subscription=new Subscription;
    private assignmentDataSub:Subscription=new Subscription;



    constructor(private route:ActivatedRoute,private router:Router,private assignmentService:AssignmentService,private classDataService:ClassDataService){
 }
    ngOnInit(){
    this.route.params.subscribe((params:Params)=>{
        this.ids=params
        this.aid=this.ids["id"];
        this.classid=this.ids['id1'];
    });

    this.getClassData();
    this.getAssignmentData();
    }
 

    getClassData(){
        this.classDataService.getClassData(this.classid)
       this.classDataSub=this.classDataService.getClassDataListner().subscribe((classData:ClassData)=>{
           this.classDataService.getMessageUpdateListner().subscribe((message:Message)=>{
               this.message=message
           })
           this.classData=classData
           
       })
    }

    getAssignmentData(){
        this.assignmentService.assignmentSubmittedList(this.aid);
        this.assignmentDataSub=this.assignmentService.getAssignmentSubmittedListner().subscribe((data:AssignmentSubmitted)=>{
            this.assignmentSubmission=data
            var data1=this.assignmentSubmission['studentsSubmission']
            this.submittedData=data1.map(x=>x.students)
         //   console.log(this.submittedData);
            
          

        })
    }
    downloadAssignment(sid:String){
        this.assignmentService.downloadAssignmentSubmission(sid,this.aid).subscribe(data=>{
            let downloadURL=window.URL.createObjectURL(data)
            const current = new Date();
            const timestamp = current.getTime();
            saveAs(downloadURL,sid+"-"+this.aid)
          })
    }
    backToAssignmentList(){
        this.router.navigate([`/assignment/${this.classid}`]);
      }
}