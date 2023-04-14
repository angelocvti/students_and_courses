import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, Observable } from 'rxjs';

import { Course } from '../model/course';
import { CourseRequest } from '../model/course-request';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = 'api/courses';
  private readonly API_WITH_INACTIVES = 'api/courses-all';

  constructor(private httpClient: HttpClient) {}

  findAll(
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: string,
    onlyActives: boolean
  ): Observable<Course[]> {
    const api = onlyActives ? this.API : this.API_WITH_INACTIVES;
    const params = {
      page: pageNumber,
      size: pageSize,
      sortBy: sortBy,
      direction: sortDirection,
    };

    return this.httpClient
      .get<{ content: Course[] }>(api, {
        params: params,
      })
      .pipe(
        first(),
        map((response) => response.content)
      );
  }

  findById(id: string): Observable<Course> {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  save(courseRequest: CourseRequest): Observable<Course> {
    return this.httpClient.post<Course>(this.API, courseRequest).pipe(first());
  }
}
