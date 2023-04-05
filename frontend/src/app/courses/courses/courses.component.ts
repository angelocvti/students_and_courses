import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, Observable, of, tap } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Course } from '../model/course';
import { CoursesService } from '../service/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements AfterViewInit {
  displayedColumns: string[] = ['name'];

  courses$!: Observable<Course[]>;

  matTableDataSource!: MatTableDataSource<Course>;
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(
    private courseService: CoursesService,
    private matDialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.courses$ = this.courseService.findAll().pipe(
      tap((students: Course[]) => {
        this.matTableDataSource = new MatTableDataSource(students);
        this.matTableDataSource.paginator = this.matPaginator;
        this.matTableDataSource.sort = this.matSort;
      }),
      catchError((error) => {
        this.onError('Erro ao carregar students.');
        return of([]);
      })
    );
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.matTableDataSource.filter = filterValue.trim().toLowerCase();

    if (this.matTableDataSource.paginator) {
      this.matTableDataSource.paginator.firstPage();
    }
  }

  private onError(errorMessage: string) {
    this.matDialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }
}
