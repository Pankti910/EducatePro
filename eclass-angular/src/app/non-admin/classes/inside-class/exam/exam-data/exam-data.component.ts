import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ExamData } from "src/app/model/examData.model";
import { ExamService } from "src/app/service/exam.service";

@Component({
    selector:'exam-data',
    templateUrl:'./exam-data.component.html',
    styleUrls:['./exam-data.component.css']
})
export class ExamDataComponent implements OnInit{

    examData!:ExamData[];
    ids!:any;
    classid!:any;
    examid!:any;

    private examDataSub:Subscription=new Subscription;

    constructor(private route:ActivatedRoute,private router:Router,private examService: ExamService){}
    ngOnInit(): void {
        this.route.params.subscribe((params:Params)=>{
            this.ids=params
            this.examid=this.ids["id"]
            this.classid=this.ids["id1"];
        })
        this.getExamData(this.examid);
    }
   

    getExamData(id:String){

        this.examService.getExamData(this.examid);
        this.examDataSub=this.examService.getExamDataUpdateListner().subscribe((data:ExamData[])=>{
            this.examData=data;
        })

    }
    backToExamList(){
        this.router.navigate([`/exam/${this.classid}`]);
      }
}