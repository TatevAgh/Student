import { Pipe, PipeTransform } from '@angular/core';
import { FilterStudent } from '../interfaces/faculty-interface'
import { Observable } from 'rxjs';


@Pipe({
  name: 'dashboardStudent'
})
export class DashboardStudentPipe implements PipeTransform {
  
  transform(
    student: FilterStudent[],
    name: string, 
    last_name: string,
    email: string,
    phone: string,
    get_faculty: string,
    get_group: string,
    
  ):  any {
    return student.filter(val =>

        (!name ||  val.name.toLowerCase().indexOf(name.toLowerCase()) !== -1) &&
        (!email ||  val.email.toLowerCase().indexOf(email.toLowerCase()) !== -1) &&
        (!last_name ||  val.last_name.toLowerCase().indexOf(last_name.toLowerCase()) !== -1) &&
        (!phone ||  val.phone.toLowerCase().indexOf(phone.toLowerCase()) !== -1) &&
        (!get_group ||  val.get_group[0].name.indexOf(get_group.toLowerCase()) !== -1) &&
        (!get_faculty ||  val.get_faculty.name.toLowerCase().indexOf(get_faculty.toLowerCase()) !== -1)
        )
        ;
  }}

 