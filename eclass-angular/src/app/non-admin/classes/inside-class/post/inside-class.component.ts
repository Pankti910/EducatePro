import { HttpEventType } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { saveAs } from "file-saver";
import { Subscription } from "rxjs";
import { ClassData } from "src/app/model/classData.model";
import { Message } from "src/app/model/message.model";
import { PostsService } from "src/app/service/posts.service";
import { ClassDataService } from "src/app/service/classData.service";
import { interval } from 'rxjs';
import { Posts } from "src/app/model/Post.model";
import { ClassUserService } from "src/app/service/classUser.service";
import { ClassList } from "src/app/model/classList.model";


export class PostAdd{
    Content:String;
    Document:FormData
  }

@Component({
    selector:'inside-class',
    templateUrl:'./inside-class.component.html',
    styleUrls:['./inside-class.component.css']
})

export class InsideClassComponent implements OnInit{
  

  
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
      selectedFiles: FileList | undefined;
      selectedFiles1: FileList | undefined;
      private classSub:Subscription=new Subscription;

      currentFile: FileList;
      classcode:string='';
      Content:String;
      value:string='';
      id!:any;
      id1!:any;
      progress1=0;
      classData!:ClassData;
      post!:Posts[];
      message!:Message;
      meetLink:string='https://secret-taiga-73367.herokuapp.com/';
      private classDataSub:Subscription=new Subscription;
      private assignmentSub:Subscription=new Subscription;
      classList!:ClassList;

      progress: number = 0;
      constructor(private classService:ClassUserService,private route:ActivatedRoute,private router:Router,private _snackBar: MatSnackBar,private classDataService:ClassDataService,private PostsService:PostsService){
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
  
  
        setTimeout(()=>{  
       
          this.getAssignments()
       },300);
       this.getClassList();
      }
     
   
      
     
  
      ngOnInit(): void {
          this.route.params.subscribe((params:Params)=>{
              this.id=params
              this.id=this.id["id"]
          });
          
          this.classInfo();
          this.getAssignments();
   
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
  
          this.PostsService.Addpost(formData,this.Content,this.id,this.id1).subscribe(event=>{
              
   
              if(event.type === HttpEventType.UploadProgress){
                this.progress = Math.round(100 * event.loaded / event.total);
                
              }
              this.getAssignments();
              this.progress=0
          },
          err => {
              this.progress = 0;
              console.log(err)
              this.message = err;
              this.currentFile = undefined;
            }
          )
          if(this.progress==100){
            this.progress=0
            this.selectedFiles = undefined;
          }
          this.openSnackBar("New Post Assign");
          this.Content="";
          this.classInfo();
          this.getAssignments();
          
        }
  
  
  
      
        openSnackBar(message: string) {
          this._snackBar.open(message,"Ok",{
              duration: 200,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
          });
        }
  
  
        tabClick(tab:any) {
          if(tab.tab.textLabel=="Assignment"){
           this.router.navigate([`/assignment/${this.id}`]);
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
              this.message=message
          })
          this.classData=classData
          this.value=this.classData.classcode.toString()
          this.meetLink=this.meetLink+classData._id
          
      })
      this.getAssignments();
     }
  
  
     getAssignments(){
       this.PostsService.getPost(this.id);
      this.assignmentSub=this.PostsService.getPostListListner().subscribe((data:Posts[])=>{
        this.post=data;
        //console.log(data);
     
      })
  
    
     }
  
     downloadAssignment(aid:String){
       this.PostsService.downloadPost(aid).subscribe(data=>{
         let downloadURL=window.URL.createObjectURL(data)
         const current = new Date();
         const timestamp = current.getTime();
         saveAs(downloadURL,timestamp.toString())
       })
     }
     deletepost(id:String){
        this.PostsService.deletepost(id).subscribe(data=>{
            this.getAssignments();
        })
     }
     getClassList(){
      this.classService.getClassList()
      this.classSub=this.classService.getClassListListner().subscribe((classList:ClassList)=>{
          this.classList=classList
          //console.log(this.classList);
      })
  }
   
}