import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';

import { Course } from '../model/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = '/assets/courses.json';

  constructor(private httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get<Course[]>(this.API).pipe(first());
  }

  findById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }
}
