import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

public studentListInfo: any = [];
public modalHidden: boolean = true;
public remove_id: number;
public title: string;
public groupListInfo: any =[];

  constructor(
    private router: Router,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.getStudentListInfo()
  }

  //get list of students from api
  public getStudentListInfo(){
    this.studentService.getStudentInfo()
    .subscribe(
      (data) => {
        this.studentListInfo = data;
      },
      (error) =>{
        console.log(error)
      }
          )
  }

  //opens confirmation modal for deleting
  public openModal(id) {
    this.modalHidden = false;
    if (id) {
      this.remove_id = id;
      this.title = " Do you want delete the student ?";
    }
  }

  //closes confirmation modal for deleting
  public closeBtn() {
    this.modalHidden = true;
  }

  //removes student from api
  public removeStudent() {
    this.studentService.removeStudentInfo(this.remove_id)
      .subscribe(
        (data) => {
          this.getStudentListInfo()
          this.modalHidden = true;
        }, (error) => {
          console.log(error)
        })
  }

  //opens component for creating 
  public createStudent(){
    this.router.navigate([`create-edit-student`])
  }

  //opens component for editing 
  public editStudent(id){
    this.router.navigate([`create-edit-student/${id}`])
  }
}
