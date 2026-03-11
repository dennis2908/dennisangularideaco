import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchListComponent } from './branch_list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Branch'
    },
    children: [
      {
        path: '',
        redirectTo: 'branch_list'
      },
      {
        path: 'branch_list',
        component: BranchListComponent,
        data: {
          title: 'Branch List'
        }
      }	  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule{}