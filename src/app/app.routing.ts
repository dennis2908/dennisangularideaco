import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { SigninComponent } from './views/signin/signin.component';

let arrRoute = []

if(localStorage.getItem("angularJS")===null){
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
	let arrAssign = JSON.parse(JSON.parse(localStorage.getItem("angularJS")).authRoleAssign)
  //arrAssign = {mrole:true,memployee:true,muser:true,mbranch:true,mcompany:true,massignment:true}
  let defaultRoute = {
				path: '',
				component: DefaultLayoutComponent,
				data: {
				  title: 'Dashboard'
				},
				children: [
				  {
					path: 'dashboard',
					loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
				  }
				]
			  }
  let mrole = defaultRoute
  let muser = defaultRoute  
  let memployee = defaultRoute  
  let mbranch = defaultRoute  
  let mcompany = defaultRoute  
  let massignment = defaultRoute 
  if(Object.keys(arrAssign).length > 0){
	  
	 if(typeof arrAssign.mrole !== 'undefined'){
		 if(arrAssign.mrole===true)
			 mrole = {
			path: '',
			component: DefaultLayoutComponent,
			data: {
			  title: 'Role'
			},
			children: [
			  {
				path: 'role',
				loadChildren: () => import('./views/role/role.module').then(m => m.RoleModule)
			  }
			]
		  }
	 }
	 
	 if(typeof arrAssign.muser !== 'undefined'){
		 if(arrAssign.muser===true)
			 muser = {
				path: '',
				component: DefaultLayoutComponent,
				data: {
				  title: 'User'
				},
				children: [
				  {
					path: 'user',
					loadChildren: () => import('./views/user/user.module').then(m => m.UserModule)
				  }
				]
			  }
	 }
	 
	 if(typeof arrAssign.memployee !== 'undefined'){
		 if(arrAssign.memployee===true)
			 memployee = {
						path: '',
						component: DefaultLayoutComponent,
						data: {
						  title: 'Employee'
						},
						children: [
						  {
							path: 'employee',
							loadChildren: () => import('./views/employee/employee.module').then(m => m.EmployeeModule)
						  }
						]
					  }
	 }
	 
	 if(typeof arrAssign.mbranch !== 'undefined'){
		 if(arrAssign.mbranch===true)
			 mbranch = {
						path: '',
						component: DefaultLayoutComponent,
						data: {
						  title: 'Branch'
						},
						children: [
						  {
							path: 'branch',
							loadChildren: () => import('./views/branch/branch.module').then(m => m.BranchModule)
						  }
						]
					  }
	 }
	 
	 if(typeof arrAssign.mcompany !== 'undefined'){
		 if(arrAssign.mcompany===true)
			 mcompany = {
						path: '',
						component: DefaultLayoutComponent,
						data: {
						  title: 'Company'
						},
						children: [
						  {
							path: 'company',
							loadChildren: () => import('./views/company/company.module').then(m => m.CompanyModule)
						  }
						]
					  }
	 }

	 if(typeof arrAssign.massignment !== 'undefined'){
		if(arrAssign.massignment===true)
				massignment = {
					   path: '',
					   component: DefaultLayoutComponent,
					   data: {
						 title: 'Assignment'
					   },
					   children: [
						 {
						   path: 'assignment',
						   loadChildren: () => import('./views/assignment/assignment.module').then(m => m.AssignmentModule)
						 }
					   ]
					 }
	}
  }
  
  arrRoute = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Dashboard'
    },
    children: [
	  {
        path: '',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  }
  ,
  mrole
  ,
  muser
  ,
  memployee
  ,
  mbranch
  ,
  mcompany
  ,
  massignment
];
}
		
export const routes: Routes = arrRoute

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}