import { Injectable } from '@angular/core';
import { BasicService } from './basic.service';
import { Observable } from 'rxjs';
import { Faculty } from '../interfaces/faculty-interface';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  constructor(private basicService: BasicService) { }
  
  public getFacultyInfo(): Observable <Faculty>{
    return this.basicService.get(`/faculties`);
  }
  public postFaculty(name): Observable <Faculty>{
    return this.basicService.post(`/faculties`, {
      name: name as Faculty | string} );
  }
  public removeFaculty(id: number): Observable <Faculty>{
    return this.basicService.delete(`/faculties/${id}`);
  }
  public editFaculty(faculty: Faculty): Observable <Faculty>{
    return this.basicService.put(`/faculties/${faculty.id}`,{
      id: faculty.id as Faculty| number,
      name: faculty.name as Faculty | string});
  } 
  public getFacultyById(id: number): Observable <Faculty>{
    return this.basicService.get(`/faculties/${id}`);
  }
  public getGroupsById(id: number): Observable <Faculty>{
    // console.log(id);
    return this.basicService.get(`/faculties/${id}/groups`);
  }
}
