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

import { Course } from '../model/course';
import { CoursesService } from '../service/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
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
export class CoursesComponent implements AfterViewInit {
  readonly displayedColumns: string[] = ['name', 'active', 'actions'];

  readonly displayedColumnsWithExpand = [...this.displayedColumns, 'expand'];

  expandedElement!: Course | null;

  readonly sortBy: SortBy[] = [{ value: 'name', viewValue: 'Name' }];

  readonly sortDirection: SortDirection[] = [
    { value: 'ASC', viewValue: 'Ascending' },
    { value: 'DESC', viewValue: 'Descending' },
  ];

  form: FormGroup;

  courses$!: Observable<Course[]>;

  matTableDataSource!: MatTableDataSource<Course>;

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private courseService: CoursesService,
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
    this.getCourses();
  }

  public onSubmit(event: Event): void {
    event.preventDefault();
    this.getCourses();
  }

  public onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  private onError(errorMessage: string) {
    this.matDialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }

  private getCourses(): void {
    this.courses$ = this.courseService.findAll(        this.form.value.pageNumber,
      this.form.value.pageSize,
      this.form.value.sortBy,
      this.form.value.sortDirection,
      this.form.value.onlyActives).pipe(
      tap((students: Course[]) => {
        this.matTableDataSource = new MatTableDataSource(students);
        this.matTableDataSource.paginator = this.matPaginator;
        this.matTableDataSource.sort = this.matSort;
      }),
      catchError((error) => {
        this.onError('Error fetching courses data.');
        return of([]);
      })
    );
  }
}
