import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Student } from 'src/app/student';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:4050/api/student/';

  constructor(private httpClient: HttpClient) {}

  findStudent() {
    return this.httpClient.get<{ student: Student }>(`${this.apiUrl}viewStudent`).pipe(
      switchMap(response => {
        const student = response.student;
        return of(student);
      }),
      catchError(error => {
        const msg = "Student Details not fetched. Please try again";
        console.error(msg, error);
        return throwError(msg);
      })
    );
  }
}
