export interface StudentSubmission{
     students:String;
     file:String;
     _id:String;
}

export interface GetAssignmentList{
 
     _id:String;
     classid:String;
     assignmentName:String;
     assignmentDocument:any;
     studentSubmission:[StudentSubmission]
  
}