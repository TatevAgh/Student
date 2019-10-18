import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateEditGroupsComponent } from './create-edit-groups.component';

const routes: Routes = [
  {
    path: '',
    component: CreateEditGroupsComponent,
    data: {
      title: 'Groups'
    }
  }
]

@NgModule({
  declarations: [CreateEditGroupsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class CreateEditGroupsModule { }
