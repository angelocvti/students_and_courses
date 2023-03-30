import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students/students.component';

@NgModule({
  declarations: [StudentsComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
  ],
})
export class StudentsModule {}
