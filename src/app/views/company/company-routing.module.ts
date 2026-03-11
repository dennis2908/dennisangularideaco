import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './company_list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Company'
    },
    children: [
      {
        path: '',
        redirectTo: 'company_list'
      },
      {
        path: 'company_list',
        component: CompanyListComponent,
        data: {
          title: 'Company List'
        }
      }	  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule{}