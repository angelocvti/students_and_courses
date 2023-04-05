import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, Observable } from 'rxjs';

import { Student } from '../model/student';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private readonly API = '/assets/students.json';

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.API).pipe(first(), delay(4000));
  }

  findById(id: string): Observable<Student> {
    return this.httpClient.get<Student>(`${this.API}/${id}`);
  }
}
