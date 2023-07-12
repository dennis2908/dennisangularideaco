import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleListComponent } from './role_list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Role'
    },
    children: [
      {
        path: '',
        redirectTo: 'role_list'
      },
      {
        path: 'role_list',
        component: RoleListComponent,
        data: {
          title: 'Role List'
        }
      }	  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule {}