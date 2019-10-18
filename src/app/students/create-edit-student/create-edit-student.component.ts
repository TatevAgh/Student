import { Component, OnInit } from '@angular/core';
import { Students } from '../../interfaces/faculty-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../../services/group.service';
import { FacultyService } from '../../services/faculty.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-create-edit-student',
  templateUrl: './create-edit-student.component.html',
  styleUrls: ['./create-edit-student.component.scss']
})
export class CreateEditStudentComponent implements OnInit {

  public id: number;
  public header: string;
  public studentsForm: FormGroup;
  public students: Students;
  public studentsListInfo: any = [];
  public facultyInfo: any = [];
  public groupInfo: any = [];
  public groupsFromFaculty: any = [];
  public modalHidden: boolean = true;
  public title: string;

  constructor(
    private rout: ActivatedRoute,
    private formBuilder: FormBuilder,
    private facultyService: FacultyService,
    private router: Router,
    private studentService: StudentService
  ) {
    this.rout.params.subscribe(data => {
      this.id = data.id;
    })
  }

  ngOnInit() {
    this.headerChanger();
    this.createForm();
    this.getFacultyListInfo();
    this.getStudentById();
  }

  //changes header depends on action
  public headerChanger() {
    if (this.id !== undefined) {
      this.header = "Edit Student";
    } else {
      this.header = "Create Student"
    }
  }

  //creates form
  public createForm() {
    this.studentsForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      faculty_id: ['', Validators.required],
      group_id: ['', Validators.required],
    })
  }

  // get faculty list info from api
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

  //gets group depends selected faculty
  public getGroupListInfo() {
    if (this.studentsForm.value.faculty_id !== 0) {
    this.facultyService.getGroupsById(this.studentsForm.value.faculty_id)
    .subscribe(
      (data) => {
        this.groupsFromFaculty = data;
        console.log(data)
      },
      (error) =>{
        console.log(error)
      }
    )
    }
  }

  // sends info to api for creating student and navigates to students page
  public createStudent(){
    this.students = {
      name: this.studentsForm.value.name,
      last_name: this.studentsForm.value.last_name,
      email: this.studentsForm.value.email,
      phone: this.studentsForm.value.phone,
      faculty_id: this.studentsForm.value.faculty_id,
      group_id: this.studentsForm.value.group_id,
      id: null,
      student: null
    }
    this.studentService.createStudent(this.students)
    .subscribe(
      (data) => {
        this.router.navigate(['students'])
      },
      (error) =>{
        console.log(error)
      }
    )
  }

  // sends edited info to api and navigates to students page
  public editStudentInfo() {
    this.students = {
      name: this.studentsForm.value.name,
      last_name: this.studentsForm.value.last_name,
      email: this.studentsForm.value.email,
      phone: this.studentsForm.value.phone,
      faculty_id: this.studentsForm.value.faculty_id,
      group_id: this.studentsForm.value.group_id,
      id: this.id,
      student: null
    }
    this.studentService.putStudentInfo(this.students)
      .subscribe(
        (data) => {
          this.router.navigate(['students']);
        },
        (error) => {
          console.log(error)
        })
  }

  //saves information depends action 
  public saveFunction() {
    if(this.studentsForm.status === 'VALID'){
      if (this.id !== undefined) {
        this.editStudentInfo();
      } else {
        this.createStudent();
      }
    }this.modalHidden = false;
    this.title = "ERROR invalid information";
  }

  public closeBtn() {
    this.modalHidden = true;
  }
  //gets students information by id for editing
  public getStudentById(){
    if(this.id !== undefined){
      this.studentService.getStudentById(this.id)
      .subscribe(
        (data) => {
          this.studentsForm.controls.name.setValue(data.student.name);
          this.studentsForm.controls.last_name.setValue(data.student.last_name);
          this.studentsForm.controls.email.setValue(data.student.email);
          this.studentsForm.controls.phone.setValue(data.student.phone);
          this.studentsForm.controls.faculty_id.setValue(data.student.faculty_id);
          this.studentsForm.controls.group_id.setValue(data.student.group_id);
          this.groupsFromFaculty = data.student.get_group;
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }

  //resets all changed info and navigates to students page
  public cancelFunction() {
    this.studentsForm.reset();
    this.router.navigate(['students'])
  }

}
