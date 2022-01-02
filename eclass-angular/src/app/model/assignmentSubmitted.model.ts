export interface AssignmentSubmitted{
    _id:String;
    classid:String;
    assignmentName:String;
    assignmentDocument:String;
    studentsSubmission:[{
        students:String;
        file:String;
        _id:String
    }]

}