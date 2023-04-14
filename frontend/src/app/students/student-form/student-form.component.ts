import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { StudentsService } from '../service/students.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent {
  form: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private studentsService: StudentsService,
    private matSnackBar: MatSnackBar,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      name: [''],
      gender: [''],
    });
  }

  public onAdd(): void {
    this.studentsService
      .save(this.form.value)
      .subscribe((_) => this.onSuccess());
  }

  private onSuccess(): void {
    this.matSnackBar.open('Student added', '', { duration: 3000 });
  }

  public onCancel() {
    this.location.back();
  }
}
