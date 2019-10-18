import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../../services/group.service';
import { FacultyService } from '../../services/faculty.service';
import { Groups } from '../../interfaces/faculty-interface';

@Component({
  selector: 'app-create-edit-groups',
  templateUrl: './create-edit-groups.component.html',
  styleUrls: ['./create-edit-groups.component.scss']
})
export class CreateEditGroupsComponent implements OnInit {
  private group: Groups;
  public id: number;
  public facultyInfo: any = [];
  public groupsForm: FormGroup;
  public header: string;
  public modalHidden: boolean = true;
  public title: string;


  constructor(
    private rout: ActivatedRoute,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private facultyService: FacultyService,
    private router: Router,
  ) {
    this.rout.params.subscribe(data => {
      this.id = data.id;
    })
  }

  ngOnInit() {
    this.getFacultyListInfo();
    this.createForm();
    this.headerChanger();
    this.getGroupById()
  }

  //changes header depends on anction which will be done
  public headerChanger() {
    if (this.id !== undefined) {
      this.header = "Edit Group";
    } else {
      this.header = "Create Group"
    }
  }

  // creates form
  public createForm() {
    this.groupsForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      faculty_id: ['']
    })
  }

  // get faculty info from api
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

  //saves information depends on anction 
  public saveFunction() {
    if(this.groupsForm.status === 'VALID'){
      if (this.id !== undefined) {
        this.editGroup();
        console.log('edit')
      } else {
        this.createGroup();
        console.log('create')
      }
    }this.modalHidden = false;
    this.title = "ERROR invalid information";
  }

  public closeBtn() {
    this.modalHidden = true;
  }


  // sends editet information to api and navigates to groups page
  public editGroup(){
    this.group = {
      id: this.id,
      name: this.groupsForm.value.name,
      faculty_id: this.groupsForm.value.faculty_id,
    }
    this.groupService.editGroup(this.group)
    .subscribe(
      (data) =>{
        this.groupsForm.reset()
        this.router.navigate(['groups'])
      },
      (error) => {
        console.log(error)
      }   )
  }

  //getss group depends selected
  public getGroupById(){
    if(this.id !== undefined) {
      this.groupService.getGroupById(this.id)
    .subscribe(
      (data) => {
        this.groupsForm.controls.name.setValue(data.name),
        this.groupsForm.controls.faculty_id.setValue(data.faculty_id)
      },
      (error) => {
        console.log(error)
      })
    }
  }

  // sends created information to api and navigates to groups page
  public createGroup() {
    this.group = {
      id: null,
      name: this.groupsForm.value.name,
      faculty_id: this.groupsForm.value.faculty_id,
    }
    this.groupService.postGroup(this.group)
      .subscribe(
        (data) => {
          this.router.navigate(['groups'])
        },
        (error) => {
          console.log(error)
        }
      )

  }

  //reset all changed information and navigates to groups page
  public cancelFunction() {
    this.groupsForm.reset();
    this.router.navigate(['groups'])
  }
}
