import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Student } from 'src/app/student';

@Component({
  selector: 'student-hostel-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  student: Student;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(): void {
    this.userService.getStudent().subscribe(
      (data: any) => {
        if (typeof data === 'string') {
          console.error(data);
        } else {
          console.log('Student data fetched:', data);
          this.student = data;
        }
      },
      (error) => {
        console.error('Error fetching student data', error);
      }
    );
  }
}
