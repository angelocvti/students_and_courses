import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { StudentsService } from '../service/students.service';
import { Student } from './../model/student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'gender', 'active', 'actions'];

  students$!: Observable<Student[]>;

  matTableDataSource!: MatTableDataSource<Student>;

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(
    private studentsService: StudentsService,
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.students$ = this.studentsService.findAll().pipe(
      tap((students: Student[]) => {
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

  public onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  private onError(errorMessage: string) {
    this.matDialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }
}
