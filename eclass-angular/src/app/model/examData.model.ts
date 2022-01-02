export interface ExamData{
    _id:String;
    userid:{
        _id:String;
        fname:String;
        lname:String;
        email:String;
    }
    totalMarks:Number;
    getMarks:Number;
}