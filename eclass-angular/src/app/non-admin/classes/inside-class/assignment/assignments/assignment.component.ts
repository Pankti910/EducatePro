import { HttpEventType } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { saveAs } from "file-saver";
import { Subscription } from "rxjs";
import { GetAssignmentList } from "src/app/model/assignment.model";
import { ClassData } from "src/app/model/classData.model";
import { Message } from "src/app/model/message.model";
import { AssignmentService } from "src/app/service/assignment.service";
import { ClassDataService } from "src/app/service/classData.service";
import { interval } from 'rxjs';
import { ClassList } from "src/app/model/classList.model";
import { ClassUserService } from "src/app/service/classUser.service";


export class AssignAssignment{
  assignment:String;
  assignmentDocument:FormData
}

@Component({
    selector:'assignment',
    templateUrl:'./assignment.component.html',
    styleUrls:['./assignment.component.css']
})



export class AssignmentComponent implements OnInit{


  
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  private classSub:Subscription=new Subscription;

  classData!:ClassData;
  message!:Message;
  classList!:ClassList;
    selectedFiles: FileList | undefined;
    selectedFiles1: FileList | undefined;
    assignmentStatus:Array<string>=[]
    assignmnetSubmissionCount:Array<number>=[];
    currentFile: FileList;
    classcode:string='';
    assignmentName:String;
    value:string='';
    id!:any;
    progress1=0;
    assignments!:GetAssignmentList[];
  
    meetLink:string='https://secret-taiga-73367.herokuapp.com/';
    private classDataSub:Subscription=new Subscription;
    private assignmentSub:Subscription=new Subscription;
    progress: number = 0;
    constructor(private classService:ClassUserService,private route:ActivatedRoute,private router:Router,private _snackBar: MatSnackBar,private classDataService:ClassDataService,private assignmentService:AssignmentService){
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };

   setInterval(this.getAssignments,4000);
      
    }
   
    
    
   

    ngOnInit(): void {
        this.route.params.subscribe((params:Params)=>{
            this.id=params
            this.id=this.id["id"]
        });
        
        this.classInfo();
        this.getAssignments();
        this.getClassList();

 
     }
     onFilepicker(event:any) {
        this.selectedFiles = event.target.files;
        this.progress=0;
      }

      onSubmissionFilepicker(event:any){
        this.selectedFiles1 = event.target.files;
     
      }

      uploadAssignment() {
      
        this.message=this.message;
        const formData: FormData = new FormData();
        for(var i=0;i<this.selectedFiles.length;i++){
          formData.append('file',this.selectedFiles.item(i));
        }

        this.assignmentService.assignmentAssign(formData,this.assignmentName,this.id).subscribe(event=>{
          this.getAssignments();
 
            if(event.type === HttpEventType.UploadProgress){
              this.progress = Math.round(100 * event.loaded / event.total);
              
            }
              
        },
        err => {
            this.progress = 0;
            console.log(err)
            this.message = err;
            this.currentFile = undefined;
          }
        )
        if(this.progress==100){
         
          this.selectedFiles = undefined;
        }
        this.openSnackBar("New Assignment Assign");
        this.progress=0;
        this.classInfo();
        this.getAssignments();
        
      }



      submitAssignment(aid:String){
       
        const formData: FormData = new FormData();
        for(var i=0;i<this.selectedFiles1.length;i++){
          formData.append('file',this.selectedFiles1.item(i));
        }

        formData.append('file',this.selectedFiles1.item(0));
    
        this.assignmentService.assignmentSubmit(formData,aid).subscribe(event=>{
          this.getAssignments();
          if(event.type === HttpEventType.UploadProgress){
            this.progress1 = Math.round(100 * event.loaded / event.total);
            
          }
 
        },
        err => {
            this.progress = 0;
            console.log(err)
            this.message = err;
            this.currentFile = undefined;
          }
        )
        this.openSnackBar("Assignment Submit");
        if(this.progress1==100){
          this.progress1=0;
          this.selectedFiles1 = undefined;
        }
       
       // this.getAssignments();
        this.classInfo();
      }

      openSnackBar(message: string) {
        this._snackBar.open(message,"Ok",{
            duration: 200,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
      }


      tabClick(tab:any) {
        if(tab.tab.textLabel=="Post"){
         this.router.navigate([`/inside-class/${this.id}`]);
     }
     if(tab.tab.textLabel=="Exam"){
         this.router.navigate([`/exam/${this.id}`])
     }
     if(tab.tab.textLabel=="People"){
         this.router.navigate([`/people/${this.id}`])
     }
   }


   classInfo(){
    this.classDataService.getClassData(this.id)
    this.classDataSub=this.classDataService.getClassDataListner().subscribe((classData:ClassData)=>{
        this.classDataService.getMessageUpdateListner().subscribe((message:Message)=>{
            this.message=message;

        })
       
        this.classData=classData
        this.value=this.classData.classcode.toString()
        this.meetLink=this.meetLink+classData._id
        
    })
    this.getAssignments();
   }


   getAssignments(){
    this.assignmentStatus=[]
     this.assignmentService.getAssignments(this.id);
    this.assignmentSub=this.assignmentService.getAssignmentListListner().subscribe((data:GetAssignmentList[])=>{
      this.assignments=data;
   
    for(var i=0;i<this.assignments.length;i++){
   
      var asssign=this.assignments[i]['studentsSubmission']
      if(asssign === undefined || asssign.length == 0){
        this.assignmentStatus.push('Remanning')
        this.assignmnetSubmissionCount.push(0)
      }
      else{

        for(var j=0;j<asssign.length;j++){
          var students=asssign.map(x=>x.students)
          this.assignmnetSubmissionCount.push(students.length)
          if(students.some(x=>x===localStorage.getItem('userid'))){
            this.assignmentStatus.push('Done')
          }
          else{
            this.assignmentStatus.push('Remanning')
          }
        }
      }
     
    }
    })

  
   }

   downloadAssignment(aid:String){
     this.assignmentService.downloadAssignmentQuestion(aid).subscribe(data=>{
       let downloadURL=window.URL.createObjectURL(data)
       const current = new Date();
       const timestamp = current.getTime();
       saveAs(downloadURL,)
     })
   }

   getClassList(){
    this.classService.getClassList()
    this.classSub=this.classService.getClassListListner().subscribe((classList:ClassList)=>{
        this.classList=classList
    })
}
}