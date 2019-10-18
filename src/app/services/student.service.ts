import { Injectable } from '@angular/core';
import { BasicService } from './basic.service';
import { Observable } from 'rxjs';
import { Students } from '../interfaces/faculty-interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private basicService: BasicService) { }

  public getStudentInfo(): Observable <Students>{
    return this.basicService.get('/students')
  }
  public createStudent(student: Students): Observable <Students>{
    return this.basicService.post(`/students`,{
      name: student.name as Students | string,
      last_name: student.last_name as Students | string,
      email: student.email as Students | string,
      phone: student.phone as Students | number,
      faculty_id: student.faculty_id as Students | number,
      group_id: student.group_id as Students | number,
      get_group: null,
      get_faculty: null,
    })
  }
  public getStudentById(id: number): Observable <Students>{
    return this.basicService.get(`/students/${id}`)
  }
  public putStudentInfo(student: Students): Observable <Students>{
    return this.basicService.put(`/students/${student.id}`,{
      name: student.name as Students | string,
      last_name: student.last_name as Students | string,
      email: student.email as Students | string,
      phone: student.phone as Students | number,
      faculty_id: student.faculty_id as Students | number,
      group_id: student.group_id as Students | number
    })
  }

  public removeStudentInfo(id: number): Observable <Students>{
    return this.basicService.delete(`/students/${id}`)
  }
}
