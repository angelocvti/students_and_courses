import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, Observable } from 'rxjs';

import { Student } from '../model/student';
import { StudentRequest } from '../model/student-request';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private readonly API = 'api/students';
  private readonly API_WITH_INACTIVES = 'api/students-all';

  constructor(private httpClient: HttpClient) {}

  findAll(
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: string,
    onlyActives: boolean
  ): Observable<Student[]> {
    const api = onlyActives ? this.API : this.API_WITH_INACTIVES;
    const params = {
      page: pageNumber,
      size: pageSize,
      sortBy: sortBy,
      direction: sortDirection,
    };

    return this.httpClient
      .get<{ content: Student[] }>(api, {
        params: params,
      })
      .pipe(
        first(),
        map((response) => response.content)
      );
  }

  findById(id: string): Observable<Student> {
    return this.httpClient.get<Student>(`${this.API}/${id}`).pipe(first());
  }

  save(studentRequest: StudentRequest): Observable<Student> {
    return this.httpClient
      .post<Student>(this.API, studentRequest)
      .pipe(first());
  }
}
