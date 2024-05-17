import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { Student } from 'src/app/student';

@Component({
  selector: 'student-hostel-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  student: Student;

  constructor(
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.fetchStudentData();
  }

  fetchStudentData(): void {
    const mockStudent: Student = {
      roomCategory: 'Deluxe',
      roomNo: 111,
      foodPackage: 'Delicious Fusion Delight',
      personNo: 1,
      firstName: 'Shreeju',
      lastName: 'Thapa',
      fatherName: 'abc',
      gender: 'Female',
      mobileNo: 9863094734,
      fatherMobileNo: 9876543210,
      email: 'user@gmail.com',
      currentAdress: 'Kirtipur',
      collegeName: 'Herald',
      isStatus: true,
      paymentStatus: true , // Assume payment is done
      checkout: "2024/6/10" // Set checkout date to current date
    };

    // Assign mock student data
    this.student = mockStudent;
  }
}
