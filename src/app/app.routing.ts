import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { SigninComponent } from './views/signin/signin.component';

let arrRoute = []

if(localStorage.getItem("angularData")===null){
  arrRoute = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: SigninComponent,
    data: {
      title: 'Sign In Page'
    }
  },
  {
    path: 'dashboard',
    redirectTo: 'signin',
    data: {
      title: 'Sign In Page'
    }
  }
  ]		
}
else{
  arrRoute = [
  {
    path: '',
    redirectTo: 'employee/employee_list',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
	  {
        path: 'employee',
        loadChildren: () => import('./views/employee/employee.module').then(m => m.EmployeeModule)
      }
    ]
  }
];
}
		
export const routes: Routes = arrRoute

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
