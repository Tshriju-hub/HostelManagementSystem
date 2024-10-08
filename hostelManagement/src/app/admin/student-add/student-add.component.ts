import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../../../app/student';
import { AdminService } from '../admin.service';

@Component({
  selector: 'hostel-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

  student: Student;
  roomNo: number[] = [];
  showRoomNo: boolean = false;
  // Room Details
  boysSuperDeluxRooms: any[];
  boysDeluxRooms: any[];
  boysStandardRooms: any[];
  girlsSuperDeluxRooms: any[];
  girlsDeluxRooms: any[];
  girlsStandardRooms: any[];
  // Room No 
  boysSuperDeluxRoomNo: number[] = [];
  boysDeluxRoomNo: number[] = [];
  boysStandardRoomNo: number[] = [];
  girlsSuperDeluxRoomNo: number[] = [];
  girlsDeluxRoomNo: number[] = [];
  girlsStandardRoomNo: number[] = [];

  studentDetails = new FormGroup({
    roomCategory: new FormControl('', [Validators.required]),
    roomNo: new FormControl('', [Validators.required]),
    foodPackage: new FormControl('', [Validators.required]),
    paymentStatus: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    fatherName: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [Validators.required, Validators.pattern("[7-9]{1}[0-9]{9}")]),
    fatherMobileNo: new FormControl('', [Validators.required, Validators.pattern("[7-9]{1}[0-9]{9}")]),
    email: new FormControl('', [Validators.required, Validators.email]),
    currentAdress: new FormControl('', [Validators.required]),
    collegeName: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private adminService: AdminService) {
    // Fetch room details from the service
    this.adminService.boysSuperDeluxRooms().subscribe((total) => {
      for (let i of total) {
        this.boysSuperDeluxRoomNo = this.boysSuperDeluxRoomNo.concat(i.roomNo);
      }
      this.boysSuperDeluxRooms = total;
    });
    this.adminService.boysDeluxRooms().subscribe((total) => {
      for (let i of total) {
        this.boysDeluxRoomNo = this.boysDeluxRoomNo.concat(i.roomNo);
      }
      this.boysDeluxRooms = total;
    });
    this.adminService.boysStandardRooms().subscribe((total) => {
      for (let i of total) {
        this.boysStandardRoomNo = this.boysStandardRoomNo.concat(i.roomNo);
      }
      this.boysStandardRooms = total;
    });
    this.adminService.girlsSuperDeluxRooms().subscribe((total) => {
      for (let i of total) {
        this.girlsSuperDeluxRoomNo = this.girlsSuperDeluxRoomNo.concat(i.roomNo);
      }
      this.girlsSuperDeluxRooms = total;
    });
    this.adminService.girlsDeluxRooms().subscribe((total) => {
      for (let i of total) {
        this.girlsDeluxRoomNo = this.girlsDeluxRoomNo.concat(i.roomNo);
      }
      this.girlsDeluxRooms = total;
    });
    this.adminService.girlsStandardRooms().subscribe((total) => {
      for (let i of total) {
        this.girlsStandardRoomNo = this.girlsStandardRoomNo.concat(i.roomNo);
      }
      this.girlsStandardRooms = total;
    });
  }

  ngOnInit(): void {}

  genderOrRoomCatSelected() {
    if (this.studentDetails.getRawValue().gender != "" && this.studentDetails.getRawValue().roomCategory != "") {
      this.showRoomNo = false;
      this.roomNo = [];
      if (this.studentDetails.getRawValue().gender == "male") {
        var roomCat = this.studentDetails.getRawValue().roomCategory;
        if (roomCat == "Super Deluxe") {
          this.roomNo = [];
          this.roomNo = this.roomNo.concat(this.boysSuperDeluxRoomNo);
          this.showRoomNo = true;
        }
        if (roomCat == "Deluxe") {
          this.roomNo = [];
          this.roomNo = this.roomNo.concat(this.boysDeluxRoomNo);
          this.showRoomNo = true;
        }
        if (roomCat == "Standard") {
          this.roomNo = [];
          this.roomNo = this.roomNo.concat(this.boysStandardRoomNo);
          this.showRoomNo = true;
        }
      }

      if (this.studentDetails.getRawValue().gender == "female") {
        var roomCat = this.studentDetails.getRawValue().roomCategory;
        if (roomCat == "Super Deluxe") {
          this.roomNo = [];
          this.roomNo = this.roomNo.concat(this.girlsSuperDeluxRoomNo);
          this.showRoomNo = true;
        }
        if (roomCat == "Deluxe") {
          this.roomNo = [];
          this.roomNo = this.roomNo.concat(this.girlsDeluxRoomNo);
          this.showRoomNo = true;
        }
        if (roomCat == "Standard") {
          this.roomNo = [];
          this.roomNo = this.roomNo.concat(this.girlsStandardRoomNo);
          this.showRoomNo = true;
        }
      }
    }
  }

  addStudent() {
    if (!this.studentDetails.valid) {
        alert('Please Enter Valid Value !');
        return;
    }

    const student = this.studentDetails.getRawValue();
    let roomDetail = this.boysSuperDeluxRooms.find(({ roomNo }) => roomNo == student.roomNo);
    if (!roomDetail) {
        roomDetail = this.boysDeluxRooms.find(({ roomNo }) => roomNo == student.roomNo);
        if (!roomDetail) {
            roomDetail = this.boysStandardRooms.find(({ roomNo }) => roomNo == student.roomNo);
            if (!roomDetail) {
                roomDetail = this.girlsSuperDeluxRooms.find(({ roomNo }) => roomNo == student.roomNo);
                if (!roomDetail) {
                    roomDetail = this.girlsDeluxRooms.find(({ roomNo }) => roomNo == student.roomNo);
                    if (!roomDetail) {
                        roomDetail = this.girlsStandardRooms.find(({ roomNo }) => roomNo == student.roomNo);
                        if (!roomDetail) {
                            alert("error");
                            return;
                        }
                    }
                }
            }
        }
    }
    student.personNo = roomDetail.personNo;

    // Set the paymentStatus property directly from the form control value
    student.paymentStatus = this.studentDetails.get('paymentStatus')?.value;

    // Log the student object before sending
    console.log('Student Object:', student);

    this.adminService.addStudent(student).subscribe({
        next: (s) => {
            alert(s);
            this.router.navigate(['/admin/viewStudent']);
        },
        error: (err) => {
            console.error('Error adding student:', err);
            alert('Registration failed. Please try again.');
        }
    });
}

  get email() {
    return this.studentDetails.get('email');
  } 

  get mobileNo() {
    return this.studentDetails.get('mobileNo');
  } 

  get fatherMobileNo() {
    return this.studentDetails.get('fatherMobileNo');
  }
}
