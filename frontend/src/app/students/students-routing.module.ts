import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentFormComponent } from './student-form/student-form.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  { path: '', component: StudentsComponent },
  { path: 'new', component: StudentFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
