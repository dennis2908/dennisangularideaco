import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentListComponent } from './assignment_list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Assignment'
    },
    children: [
      {
        path: '',
        redirectTo: 'assignment_list'
      },
      {
        path: 'assignment_list',
        component: AssignmentListComponent,
        data: {
          title: 'Assignment List'
        }
      }	  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentRoutingModule{}