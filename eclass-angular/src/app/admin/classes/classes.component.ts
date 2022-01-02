import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Classes } from "src/app/model/classes.model";
import { ClassesService } from "src/app/service/classes.service";
import {Router} from '@angular/router';

@Component({
    selector:'admin-classes',
    templateUrl:'./classes.component.html',
    styleUrls:['./classes.component.css']

})

export class ClassesComponent implements OnInit{
    classes:Classes[]=[];
    classStatus:String | undefined;
    allow!:String;
    private classesSub:Subscription=new Subscription;
    constructor(private classesService:ClassesService,private router: Router){}
    ngOnInit(): void {
        const role=localStorage.getItem('role');
      
        if(role=="Admin") this.allow="Yes";
        else this.allow="No";

        this.getClasses();
        this.classStatus="All";
    }
    getClasses(){
       
        this.classesService.getClasses();
        this.classesSub=this.classesService.getClassesUpdateListner().subscribe((classes:Classes[])=>{
         this.classes=classes;
        });
    }
    ngOnDestroy(): void {
        this.classesSub.unsubscribe();
    }

    changeStatusOfClass(_id:string,item:Classes){
        this.classesService.changeStatusClass(_id,item);
        this.getClasses();
    }

    getClassesByStatus(status:string){
        
        this.classStatus=status;
    }

    tabClick(tab:any) {
        if(tab.tab.textLabel!="Classes"){
           
            this.router.navigate(['/admin-users']);
        }
      }
      redirectToPage(){
          
        if(localStorage.getItem('role')==null){
            this.router.navigate(['/']);
        }
        else{
          this.router.navigate(['/class-list']);
        }
    }
}