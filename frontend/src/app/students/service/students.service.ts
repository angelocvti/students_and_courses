import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { first } from 'rxjs/operators';

import { Student } from '../model/student';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private readonly API = '/assets/students.json';

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.API).pipe(first());
  }

  findById(id: string) {
    return this.httpClient.get<Student>(`${this.API}/${id}`);
  }
}
