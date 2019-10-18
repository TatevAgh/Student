import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../services/group.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  public groupListInfo: any = [];
  public modalHidden: boolean = true;
  public remove_id: number;
  public title: string;
  public studentList: any = [];
  public itemStudent: any;

  constructor(
    private router: Router,
    private groupService: GroupService,
    private studentsService: StudentService
  ) { }

  ngOnInit() {
    this.getGroupListInfo();
    this.getStudent();
  }

  //opens modal for confirmation to deleting
  public openModal(id){
    this.modalHidden = false;
    if(id){
      this.remove_id = id;
      this.title = " Do you want delete the group ?";
    }
  }

  //closes modal for deleting
  public closeBtn() {
    this.modalHidden = true;
  }

  //get list of groupinfo from api
  public getGroupListInfo(){
    this.groupService.getGroupInfo()
    .subscribe(
      (data) => {
        this.groupListInfo = data;
      },
      (error) => {
        console.log(error)
      }
    )
  }
  
  // removes group from api, at the same time deletes student which has that group which is deleted
  public removeGroup(){
    this.groupService.removeGroup(this.remove_id)
    .subscribe(
      (data) => {
        this.studentList.filter(item => {
          if (item.group_id = this.remove_id) {
            return this.itemStudent = item;
          }
        }) 
        this.studentsService.removeStudentInfo(this.itemStudent.id)
        .subscribe(
          (data) => {
          }
        )
        this.getGroupListInfo();
        this.modalHidden = true;
      },
      
      (error) => {
        console.log(error)
      }
    )
  }

  // get student list info from api
  public getStudent() {
    this.studentsService.getStudentInfo()
      .subscribe(
        (data) => {
          this.studentList = data;
        }
      )
  }

  // opens component for creating
  public createGroup(){
    this.router.navigate(['create-edit-groups']);
  }

  // opens component for editing
  public editGroup(id){
    this.router.navigate([`create-edit-groups/${id}`])
  }
}
