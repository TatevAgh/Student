import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacultyService } from '../services/faculty.service';
import { StudentService } from '../services/student.service';


@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {

  public facultyInfo: any = [];
  public title: string;
  public showModal = false;
  public remove_id: number;
  public modalHidden: boolean = true;
  public studentList: any = [];
  public itemStudent: any;
  
  constructor(
    private router: Router,
    private facultyService: FacultyService,
    private studentsService: StudentService
  ) { }

  ngOnInit() {
    this.getFacultyListInfo();
    this.getStudent();
  }

  // get list of Faculty from api
  public getFacultyListInfo() {
    this.facultyService.getFacultyInfo()
      .subscribe(
        (data) => {
          this.facultyInfo = data;
        },
        (error) => {
          console.log(error)
        }
      )
  }

  //opens modal for conformation to delete
  public openModal(id) {
    this.modalHidden = false;
    if (id) {
      this.remove_id = id;
      this.title = " Do you want delete the faculty ?";
    }
  }
 
  // closes modal
  public closeBtn() {
    this.modalHidden = true;
  }
  
  // removes facluty from api list at the same time deletes student who has the faculty
  // return list with deleted items
  public removeFaculty() {
    this.facultyService.removeFaculty(this.remove_id)
      .subscribe(
        (data) => {
          this.studentList.filter(item => {
            if (item.faculty_id = this.remove_id) {
              return this.itemStudent = item;
            }
          })
          this.studentsService.removeStudentInfo(this.itemStudent.id)
            .subscribe(
              (data) => {
              }
            ),
          this.getFacultyListInfo();
          this.modalHidden = true;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // get student info from api , for deleting student(from deleted faculty)
  public getStudent() {
    this.studentsService.getStudentInfo()
      .subscribe(
        (data) => {
          this.studentList = data;
        }
      )
  }

  // opens component for creating
  public createFaculty() {
    this.router.navigate(['create-edit-faculty'])
  }

   // opens component for editing
  public editFaculty(id) {
    this.router.navigate([`create-edit-faculty/${id}`])
  }
}
