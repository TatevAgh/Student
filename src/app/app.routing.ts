import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
// import { LoginComponent } from './views/login/login.component';
import { FacultyComponent } from './faculty/faculty.component';
import { CreateEditFacultyComponent } from './faculty/create-edit-faculty/create-edit-faculty.component';
import { GroupsComponent } from './groups/groups.component';
import { CreateEditGroupsComponent } from './groups/create-edit-groups/create-edit-groups.component';
import { StudentsComponent } from './students/students.component';
import { CreateEditStudentComponent } from './students/create-edit-student/create-edit-student.component';
import { DashboardStudentComponent } from './dashboard-student/dashboard-student.component';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'faculty',
        component: FacultyComponent,
        loadChildren: () => import('./faculty/faculty.module').then(m => m.FacultyModule),
        data: {
          title: 'Faculties'
        },
      },{
        path: 'create-edit-faculty',
        component: CreateEditFacultyComponent,
        loadChildren: () => import('./faculty/create-edit-faculty/create-edit-faculty.module').then( m => m.CreateEditFacultyModule),
        data: {
          title: 'Create'
        },
      },
      {
        path: 'create-edit-faculty/:id',
        component: CreateEditFacultyComponent,
        loadChildren: () => import('./faculty/create-edit-faculty/create-edit-faculty.module').then( m => m.CreateEditFacultyModule),
        data: {
          title: 'Edit'
        },
      },
      {
        path: 'groups',
        component: GroupsComponent,
        loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule),
        data: {
          title: 'Groups'
        },
      },{
        path: 'create-edit-groups',
        component: CreateEditGroupsComponent,
        loadChildren: () => import('./groups/create-edit-groups/create-edit-groups.module').then( m => m.CreateEditGroupsModule),
        data: {
          title: 'Create'
        },
      },{
        path: 'create-edit-groups/:id',
        component: CreateEditGroupsComponent,
        loadChildren: () => import('./groups/create-edit-groups/create-edit-groups.module').then( m => m.CreateEditGroupsModule),
        data: {
          title: 'Edit'
        },
      },{
        path: 'students',
        component: StudentsComponent,
        loadChildren: () => import('./students/students.module').then(m => m.StudentsModule),
        data: {
          title: 'Students'
        },
      },{
        path: 'create-edit-student',
        component: CreateEditStudentComponent,
        loadChildren: () => import('./students/create-edit-student/create-edit-student.module').then( m => m.CreateEditStudentModule),
        data: {
          title: 'Create'
        },
      },{
        path: 'create-edit-student/:id',
        component: CreateEditStudentComponent,
        loadChildren: () => import('./students/create-edit-student/create-edit-student.module').then( m => m.CreateEditStudentModule),
        data: {
          title: 'Edit'
        },
      },{
        path: 'dashboard',
        component: DashboardStudentComponent,
        loadChildren: () => import('./dashboard-student/dashboard-student.module').then(m => m.DashboardStudentModule),
        data: {
          title: 'Dashboard'
        },
      },
    ]
  }
  ,
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
