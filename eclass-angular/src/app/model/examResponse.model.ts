import { responseModel } from "./response.model";

export interface examResponse{
    userid:String,
    examid:String,
    reponsesByUser:[responseModel],
    totalMarks:Number,
    getMarks:Number
}