import { examQueAndAns } from "./examQueAndans.model";





export interface Exam{
    _id:String,
    class:String;
    exam:String;
    queAndans:[examQueAndAns];
    totalMarks:Number
}