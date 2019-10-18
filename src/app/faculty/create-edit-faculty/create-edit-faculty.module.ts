import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreateEditFacultyComponent } from './create-edit-faculty.component';
import { ReactiveFormsModule } from '@angular/forms';

  
const routes: Routes = [
  
  {
    path: '',
    component: CreateEditFacultyComponent,
    data: {
      title: 'Faculties'
    }
  }
]

@NgModule({
  declarations: [CreateEditFacultyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class CreateEditFacultyModule { }
