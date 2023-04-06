import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students/students.component';

@NgModule({
  declarations: [StudentsComponent, StudentFormComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class StudentsModule {}
