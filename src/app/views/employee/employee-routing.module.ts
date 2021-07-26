import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee_list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Employee'
    },
    children: [
      {
        path: '',
        redirectTo: 'employee_list'
      },
      {
        path: 'employee_list',
        component: EmployeeListComponent,
        data: {
          title: 'Employee User'
        }
      }	  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}