import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/student';
import { AdminService } from '../admin.service';
import { ViewAllStudentService } from '../view-all-student/view-all-student.service';

@Component({
  selector: 'pm-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css',
    '../view-all-student/view-all-student.component.css',
    '../student-add/student-add.component.css'
  ]
})
export class UpdateStudentComponent implements OnInit {
  students: Student[] = [];
  msg: string;
  maleStudents: Student[] = [];
  superDeluxeRoomsMaleStudents: Student[] = [];
  deluxeRoomsMaleStudents: Student[] = [];
  standardRoomsMaleStudents: Student[] = [];
  femaleStudents: Student[] = [];
  superDeluxeRoomsFemaleStudents: Student[] = [];
  deluxeRoomsFemaleStudents: Student[] = [];
  standardRoomsFemaleStudents: Student[] = [];
  searchRooms: Student[] = [];
  searchIsDone: boolean = false;
  searchmsg: string = "No Student Found!!";
  rNoForSearch = new FormGroup({
    rNo: new FormControl('', [Validators.required])
  });
  studentDetails = new FormGroup({
    roomNo: new FormControl('', [Validators.required]),
    personNo: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    roomCategory: new FormControl('', [Validators.required]),
    foodPackage: new FormControl('', [Validators.required]),
    paymentStatus: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    fatherName: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [Validators.required, Validators.pattern("[7-9]{1}[0-9]{9}")]),
    fatherMobileNo: new FormControl('', [Validators.required, Validators.pattern("[7-9]{1}[0-9]{9}")]),
    email: new FormControl('', [Validators.required, Validators.email]),
    currentAdress: new FormControl('', [Validators.required]),
    collegeName: new FormControl('', [Validators.required]),
    isStatus: new FormControl('', [Validators.required])
  });

  constructor(
    private viewAllStudentService: ViewAllStudentService,
    private adminService: AdminService,
    private router: Router
  ) {
    this.viewAllStudentService.findStudent().subscribe((studentsDetail) => {
      this.students = studentsDetail;
      this.students.sort((a, b) => (a.roomNo > b.roomNo) ? 1 : -1);
      this.students = this.students.filter(a => a.isStatus !== false);
      this.femaleStudents = this.students.filter(a => a.gender == "female");
      this.superDeluxeRoomsFemaleStudents = this.femaleStudents.filter(a => a.roomCategory == "Super Deluxe");
      this.deluxeRoomsFemaleStudents = this.femaleStudents.filter(a => a.roomCategory == "Deluxe");
      this.standardRoomsFemaleStudents = this.femaleStudents.filter(a => a.roomCategory == "Standard");
      this.maleStudents = this.students.filter(a => a.gender == "male");
      this.superDeluxeRoomsMaleStudents = this.maleStudents.filter(a => a.roomCategory == "Super Deluxe");
      this.deluxeRoomsMaleStudents = this.maleStudents.filter(a => a.roomCategory == "Deluxe");
      this.standardRoomsMaleStudents = this.maleStudents.filter(a => a.roomCategory == "Standard");
      this.msg = 'There is not a single student';
    });
  }

  ngOnInit(): void { }

  updateStudent() {
    if (this.studentDetails.valid) {
      const student = this.studentDetails.getRawValue();
      this.adminService.updateStudent(student).subscribe(
        (msg) => {
          alert(msg);
          window.location.reload();
        },
        (error) => {
          console.error('Error updating student:', error);
          alert('Failed to update student');
        }
      );
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }

  removeStudent() {
    if (this.studentDetails.valid) {
      const student = this.studentDetails.getRawValue();
      if (confirm(`Are you sure to delete room no ${student.roomNo}`)) {
        this.adminService.removeStudent(student).subscribe(
          (msg) => {
            alert(msg);
            window.location.reload();
          },
          (error) => {
            console.error('Error removing student:', error);
            alert('Failed to remove student');
          }
        );
      }
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
  

  searchRoomNo() {
    this.searchIsDone = false;
    if (!this.rNoForSearch.valid) {
      alert('Please enter a valid room number');
      return;
    }
    const roomNoDetails = this.rNoForSearch.getRawValue();
    this.searchRooms = this.students.filter(a => a.roomNo == roomNoDetails.rNo);
    this.searchIsDone = true;
  }

  setValue(student: Student) {
    this.studentDetails.patchValue(student);
  }

  transferOrCreateStudent() {
    const newRoomNoStr = prompt("Enter new room number:");
    if (newRoomNoStr) {
      const newRoomNo = parseInt(newRoomNoStr, 10);
      if (!isNaN(newRoomNo)) {
        const student = this.studentDetails.getRawValue();
        student.roomNo = newRoomNo;
        const existingStudent = this.students.find(s => s.roomNo === newRoomNo);

        if (existingStudent) {
          this.adminService.removeStudent(existingStudent).subscribe(
            (removeMsg) => {
              console.log(removeMsg);
              this.adminService.updateStudent(student).subscribe(
                (updateMsg) => {
                  alert(updateMsg);
                  window.location.reload();
                },
                (error) => {
                  console.error('Error updating student:', error);
                  alert('Failed to update student');
                }
              );
            },
            (error) => {
              console.error('Error removing existing student:', error);
              alert('Failed to remove existing student');
            }
          );
        } else {
          this.adminService.addStudent(student).subscribe(
            (addMsg) => {
              alert(addMsg);
              window.location.reload();
            },
            (error) => {
              console.error('Error adding student:', error);
              alert('Failed to add student');
            }
          );
        }
      } else {
        alert("Please enter a valid room number.");
      }
    }
  }

  get rNo() {
    return this.rNoForSearch.get('rNo');
  }
}
