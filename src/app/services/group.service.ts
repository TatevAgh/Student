import { Injectable } from '@angular/core';
import { BasicService } from './basic.service';
import { Observable } from 'rxjs';
import { Groups } from '../interfaces/faculty-interface';


@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private basicService: BasicService) { }

  public getGroupInfo(): Observable <Groups>{
    return this.basicService.get(`/groups`);
  }
  public postGroup(group: Groups): Observable <Groups>{
    return this.basicService.post(`/groups`, {
      name: group.name  as Groups | string,
      faculty_id: group.faculty_id as Groups | number})
  }
  public editGroup(group: Groups): Observable <Groups>{
    return this.basicService.put(`/groups/${group.id}`,{
      id: group.id as Groups | number,
      name: group.name as Groups | string,
      faculty_id:  group.faculty_id as Groups | number
    })
  }
  public removeGroup(id):Observable<Groups>{
    return this.basicService.delete(`/groups/${id}`)
  }
  public getGroupById(id): Observable <Groups>{
    return this.basicService.get(`/groups/${id}`)
  }
}
