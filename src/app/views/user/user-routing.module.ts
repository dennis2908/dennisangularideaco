import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user_list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'User'
    },
    children: [
      {
        path: '',
        redirectTo: 'user_list'
      },
      {
        path: 'user_list',
        component: UserListComponent,
        data: {
          title: 'User List'
        }
      }	  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule{}