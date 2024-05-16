import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { EMPTY, of, throwError } from 'rxjs';
import { Student } from '../../app/student';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:4050/api/student/';

  constructor(private httpClient: HttpClient, private router: Router) { }

  // Method to get the total availability by summing up the counts from different categories
  
  addStudent(studentToSave: Student) {
    return this.httpClient.post<any>(`${this.apiUrl}addStudent`, studentToSave).pipe(
      switchMap(({ student, msg }) => {
        // Ensure foodPackage is being sent and processed correctly
        console.log('Food Package:', studentToSave.foodPackage);
        return of(msg);
      }),
      catchError(err => {
        console.log('Server error occurred:', err);
        const msg = 'Registration failed. Please contact the admin';
        return of(msg);
      })
    );
  }

  updateStudent(studentToUpdate: any) {
    // Ensure foodPackage is being sent and processed correctly
    console.log('Updating student details:', studentToUpdate.foodPackage);
    return this.httpClient.post<any>(`${this.apiUrl}updateStudent`, studentToUpdate).pipe(
      switchMap(({ msg }) => {
        console.log('Update message:', msg);
        return of(msg);
      }),
      catchError(error => {
        console.log('Error updating student:', error);
        const msg = "Student details not updated. Please try again";
        return of(msg);
      })
    );
  }

  removeStudent(studentToRemove: any) {
    return this.httpClient.post<any>(`${this.apiUrl}removeStudent`, studentToRemove).pipe(
      switchMap(({ msg }) => {
        console.log('Remove message:', msg);
        return of(msg);
      }),
      catchError(error => {
        console.log('Error removing student:', error);
        const msg = "Student details not removed. Please try again";
        return of(msg);
      })
    );
  }

  boysSuperDeluxRooms() {
    return this.httpClient.get<any>(`http://localhost:4050/api/boysRooms/superDeluxeRooms`).pipe(
      switchMap(({ total }) => {
        return of(total);
      }),
      catchError(error => {
        const msg = "Boys Super Deluxe Room details not fetched. Please try again";
        return of(msg);
      })
    );
  }

  boysDeluxRooms() {
    return this.httpClient.get<any>(`http://localhost:4050/api/boysRooms/deluxeRooms`).pipe(
      switchMap(({ total }) => {
        return of(total);
      }),
      catchError(error => {
        const msg = "Boys Deluxe Room details not fetched. Please try again";
        return of(msg);
      })
    );
  }

  boysStandardRooms() {
    return this.httpClient.get<any>(`http://localhost:4050/api/boysRooms/standardRooms`).pipe(
      switchMap(({ total }) => {
        return of(total);
      }),
      catchError(error => {
        const msg = "Boys Standard Room details not fetched. Please try again";
        return of(msg);
      })
    );
  }

  girlsSuperDeluxRooms() {
    return this.httpClient.get<any>(`http://localhost:4050/api/girlsRooms/superDeluxeRooms`).pipe(
      switchMap(({ total }) => {
        return of(total);
      }),
      catchError(error => {
        const msg = "Girls Super Deluxe Room details not fetched. Please try again";
        return of(msg);
      })
    );
  }

  girlsDeluxRooms() {
    return this.httpClient.get<any>(`http://localhost:4050/api/girlsRooms/deluxeRooms`).pipe(
      switchMap(({ total }) => {
        return of(total);
      }),
      catchError(error => {
        const msg = "Girls Deluxe Room details not fetched. Please try again";
        return of(msg);
      })
    );
  }

  girlsStandardRooms() {
    return this.httpClient.get<any>(`http://localhost:4050/api/girlsRooms/standardRooms`).pipe(
      switchMap(({ total }) => {
        return of(total);
      }),
      catchError(error => {
        const msg = "Girls Standard Room details not fetched. Please try again";
        return of(msg);
      })
    );
  }

  getTotalAvailability() {
    return this.boysSuperDeluxRooms().pipe(
      switchMap(boysSuperDeluxeCount => {
        return this.boysDeluxRooms().pipe(
          switchMap(boysDeluxeCount => {
            return this.boysStandardRooms().pipe(
              switchMap(boysStandardCount => {
                return this.girlsSuperDeluxRooms().pipe(
                  switchMap(girlsSuperDeluxeCount => {
                    return this.girlsDeluxRooms().pipe(
                      switchMap(girlsDeluxeCount => {
                        return this.girlsStandardRooms().pipe(
                          switchMap(girlsStandardCount => {
                            const totalAvailability = boysSuperDeluxeCount + boysDeluxeCount + boysStandardCount +
                                                      girlsSuperDeluxeCount + girlsDeluxeCount + girlsStandardCount;
                            return of(totalAvailability);
                          })
                        );
                      })
                    );
                  })
                );
              })
            );
          })
        );
      })
    );
  }

  findHostelPriceDetails() {
    return this.httpClient.get<any>(`http://localhost:4050/api/prices/findHostelPriceDetails`).pipe(
      switchMap(({ price }) => {
        console.log('Found price details:', price);
        return of(price);
      }),
      catchError(err => {
        return throwError('Hostel price details not fetched. Please try again');
      })
    );
  }

  updatePriceDetails(priceDetails: any) {
    return this.httpClient.post<any>(`http://localhost:4050/api/prices/updatePriceDetails`, priceDetails).pipe(
      switchMap(({ msg }) => {
        console.log('Price update message:', msg);
        return of(msg);
      }),
      catchError(error => {
        const msg = "Price details not updated. Please try again";
        return of(msg);
      })
    );
  }

  getAllUsers() {
    return this.httpClient.get<any>(`http://localhost:4050/api/users/AllUser`).pipe(
      switchMap(({ users }) => {
        return of(users);
      }),
      catchError(err => {
        return throwError('User details not fetched. Please try again');
      })
    );
  }

  updateUser(user: any) {
    return this.httpClient.post<any>(`http://localhost:4050/api/users/userUpdate`, user).pipe(
      switchMap(({ msg }) => {
        console.log('User update message:', msg);
        return of(msg);
      }),
      catchError(error => {
        const msg = "User details not updated. Please try again";
        return of(msg);
      })
    );
  }

}
