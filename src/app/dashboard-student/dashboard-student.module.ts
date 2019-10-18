import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardStudentComponent } from './dashboard-student.component';
import { DashboardStudentPipe } from '../pipe/dashboard-student.pipe';



const routes: Routes = [
  {
    path: '',
    component: DashboardStudentComponent,
    data: {
      title: 'Dashboard'
    }
  }

]

@NgModule({
  declarations: [DashboardStudentComponent, DashboardStudentPipe],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class DashboardStudentModule { }
