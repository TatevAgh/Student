import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { GroupService } from '../services/group.service';
import { FacultyService } from '../services/faculty.service';
import { FilterStudent } from '../interfaces/faculty-interface';


@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.scss']
})
export class DashboardStudentComponent implements OnInit {

  public studentListInfo: any = [];
  public groupListInfo: any = [];
  public facultyListInfo: any =[];
  public dashboard: FilterStudent[];

  filterResult: FilterStudent = {
    name: '',
    last_name: '',
    phone: '',
    email: '',
    get_faculty: '',
    get_group: ''
  };

  constructor(
    private studentService: StudentService,
    private groupService: GroupService,
    private facultyService: FacultyService,
  ) {
  }

  ngOnInit() {
    this.getStudentListInfo();
    this.getGroupList();
    this.getFacultyList();
    }

  //get list of students from api
  public getStudentListInfo(){
    this.studentService.getStudentInfo()
    .subscribe(
      (data) => {
        this.studentListInfo = data;
      }
    ), (error) => {
      console.log(error)
    }
  }

  // get list of faculties from api
  public getFacultyList(){
    this.facultyService.getFacultyInfo()
    .subscribe(
      (data) => {
        this.facultyListInfo = data;
      },
      (error) => {
        console.log(error)
      }
    )
  }

  //get list of groups from api
  public getGroupList(){
    this.groupService.getGroupInfo()
    .subscribe(
      (data) => {
        this.groupListInfo = data;
      },(error) =>{
        console.log(error)
      }
    )
  }
}
