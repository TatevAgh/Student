import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacultyService } from '../../services/faculty.service';
import { Faculty } from '../../interfaces/faculty-interface';

@Component({
  selector: 'app-create-edit-faculty',
  templateUrl: './create-edit-faculty.component.html',
  styleUrls: ['./create-edit-faculty.component.scss']
})
export class CreateEditFacultyComponent implements OnInit {
  private faculty: Faculty;
  public id: number;
  public facultyForm: FormGroup;
  public header: string;

  constructor(
    private rout: ActivatedRoute,
    private formBuilder: FormBuilder,
    private facultyService: FacultyService,
    private router: Router
  ) {
    this.rout.params.subscribe(data => {
      this.id = data.id;
    })
   }

  ngOnInit() {
    this.createForm();
    this.headerChanger();
    this.getFacultyById()
  }

// gives header to component depends on action wich will be done in component
  public headerChanger(){
    if(this.id !== undefined){
      this.header = "Edit Faculty";
    }else{
      this.header = "Create Faculty"
    }
  }

// get the faculty wich will be edited
  public getFacultyById() {
    if(this.id !== undefined) {
      this.facultyService.getFacultyById(this.id)
        .subscribe(data => {
          this.facultyForm.controls.name.setValue(data.name);
        })
    }
  }

  //creates form
  public createForm() {
    this.facultyForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    })
  }

  // saves information depends on anction
  public saveFunction(){
    if(this.facultyForm.status === 'VALID'){
      if (this.id !== undefined) {
        this.editFaculty();
      } else {
        this.createFaculty();
      }
    }
  }

  // sends changes to api, and then navigates to faculty page
  public editFaculty(){
    this.faculty = {
      id: this.id,
      name: this.facultyForm.value.name
    }
    this.facultyService.editFaculty(this.faculty)
      .subscribe(
        (data) => {
          this.router.navigate(['faculty']);
        },
        (error) => {
          console.log(error);
        }
      )
  }

  // sends new information about new faculty to api and navigate to faculty page 
  public createFaculty(){
    this.facultyService.postFaculty(this.facultyForm.value.name)
      .subscribe(
        (data) => {
          this.router.navigate(['faculty'])
        }, (error) => {
          console.log(error)// pop up
        }
      )
  }

  // resets all changes and navigate to faculty page
  public cancelFunction(){
    this.facultyForm.reset();
    this.router.navigate(['faculty'])
  }
}
