import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateEditStudentComponent } from './create-edit-student.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: CreateEditStudentComponent,
    data: {
      title: 'Students'
    }
  }
]

@NgModule({
  declarations: [CreateEditStudentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [RouterModule]
})
export class CreateEditStudentModule { }
