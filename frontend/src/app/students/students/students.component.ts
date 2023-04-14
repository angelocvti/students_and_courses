import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { SortBy } from 'src/app/shared/interface/sort-by';
import { SortDirection } from 'src/app/shared/interface/sort-direction';

import { StudentsService } from '../service/students.service';
import { Student } from './../model/student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class StudentsComponent implements AfterViewInit {
  readonly displayedColumns: string[] = [
    'name',
    'identifier',
    'gender',
    'active',
    'actions',
  ];

  readonly displayedColumnsWithExpand = [...this.displayedColumns, 'expand'];

  expandedElement!: Student | null;

  readonly sortBy: SortBy[] = [
    { value: 'name', viewValue: 'Name' },
    { value: 'identifier', viewValue: 'Identifier' },
    { value: 'gender', viewValue: 'Gender' },
  ];

  readonly sortDirection: SortDirection[] = [
    { value: 'ASC', viewValue: 'Ascending' },
    { value: 'DESC', viewValue: 'Descending' },
  ];

  form: FormGroup;

  students$!: Observable<Student[]>;

  matTableDataSource!: MatTableDataSource<Student>;

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private studentsService: StudentsService,
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      pageNumber: [0],
      pageSize: [10],
      sortBy: [this.sortBy[0].value],
      sortDirection: [this.sortDirection[0].value],
      onlyActives: [true],
    });
  }

  public ngAfterViewInit(): void {
    this.getStudents();
  }

  public onSubmit(event: Event): void {
    event.preventDefault();
    this.getStudents();
  }

  public onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  private onError(errorMessage: string) {
    this.matDialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }

  private getStudents(): void {
    this.students$ = this.studentsService
      .findAll(
        this.form.value.pageNumber,
        this.form.value.pageSize,
        this.form.value.sortBy,
        this.form.value.sortDirection,
        this.form.value.onlyActives
      )
      .pipe(
        tap((students: Student[]) => {
          this.matTableDataSource = new MatTableDataSource(students);
          this.matTableDataSource.paginator = this.matPaginator;
          this.matTableDataSource.sort = this.matSort;
        }),
        catchError((error) => {
          this.onError('Error fetching students data.');
          return of([]);
        })
      );
  }
}
