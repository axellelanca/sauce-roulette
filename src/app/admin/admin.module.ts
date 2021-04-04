import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { AddStudentComponent } from './add-student/add-student.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'student/add',
    component: AddStudentComponent
  },
  {
    path: 'student/:id',
    component: EditStudentComponent
  },
  {
    path: '**/**',
    redirectTo: ''
  }
]

@NgModule({
  declarations: [AdminComponent, EditStudentComponent, AddStudentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AdminModule { }
