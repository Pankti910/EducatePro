import { NgModule } from '@angular/core';
import { MainHeaderBarComponent } from './header-bar/main-headerbar/main-headerbar.component';
import { RouterModule, Routes } from '@angular/router';
import { InsideClassComponent } from './non-admin/classes/inside-class/post/inside-class.component';
import { UsersComponent } from './admin/users/users.component';
import { ClassesComponent } from './admin/classes/classes.component';
import { LoginComponent } from './login/login.component';
import { ClassListComponent } from './non-admin/classes/user-class-list/class-list.component';
import { RegistrationComponent } from './registration/registration.component';
import { PageNotFoundComponent } from './error-pages/404/pagenotfound.component';
import { ExamDataComponent } from './non-admin/classes/inside-class/exam/exam-data/exam-data.component';
import { ExamAddComponent } from './non-admin/classes/inside-class/exam/exam-add/exam-add.component';
import { ExamListComponent } from './non-admin/classes/inside-class/exam/exam-list/exam-list.component';
import { ExamSubmitComponent } from './non-admin/classes/inside-class/exam/exam-submit/exam-submit.component';
import { PeopleComponent } from './non-admin/classes/inside-class/people/people.component';
import { AssignmentComponent } from './non-admin/classes/inside-class/assignment/assignments/assignment.component'; 
import { AssignmentSubmissionComponent } from './non-admin/classes/inside-class/assignment/downloadAssignments/assignments-submission-list.component';
const routes: Routes = [
  {path:'exam-data/:id/:id1',component:ExamDataComponent},
  {path:'assignment-submission/:id/:id1',component:AssignmentSubmissionComponent},
  {path:'assignment/:id',component:AssignmentComponent},
  {path:'exam/:id',component:ExamListComponent},
  {path:'people/:id',component:PeopleComponent},
  {path:'exam-submit/:id',component:ExamSubmitComponent},
  {path:'inside-class/:id',component:InsideClassComponent},
  {path:'exam-add/:id',component:ExamAddComponent},
  { path: 'admin-users', component:UsersComponent },
  { path: 'admin-classes', component:ClassesComponent},
  { path: 'class-list',component:ClassListComponent},
  { path : 'registration',component:RegistrationComponent},
  { path: 'login',component:LoginComponent},
  { path: '',component:LoginComponent},
  { path: '**', pathMatch: 'full', 
  component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=

[ExamDataComponent,AssignmentSubmissionComponent,InsideClassComponent,ExamListComponent,PeopleComponent,UsersComponent,ClassesComponent,LoginComponent,ClassListComponent,RegistrationComponent,PageNotFoundComponent,ExamAddComponent,ExamSubmitComponent,MainHeaderBarComponent,AssignmentComponent];