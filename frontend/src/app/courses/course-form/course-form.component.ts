import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../service/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  form: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private courseService: CoursesService,
    private matSnackBar: MatSnackBar,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      name: [''],
    });
  }

  public onAdd(): void {
    this.courseService.save(this.form.value).subscribe((_) => this.onSuccess());
  }

  private onSuccess(): void {
    this.matSnackBar.open('Course added', '', { duration: 3000 });
  }

  public onCancel() {
    this.location.back();
  }
}
