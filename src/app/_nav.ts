import { INavData } from '@coreui/angular';

let mrole={}
let muser={}
let memployee={}
let mbranch={}
let mcompany={}
let massignment={}

if(localStorage.getItem("angularJS")!==null){
	
	let arrAssign = JSON.parse(JSON.parse(localStorage.getItem("angularJS")).authRoleAssign)
	console.log(arrAssign)

	// arrAssign = {mrole:true,memployee:true,muser:true,mbranch:true,mcompany:true,massignment}
	
  if(Object.keys(arrAssign).length > 0){
	  
	 
	//  let cekmrole = Object.values(arrAssign).find((obj) => {
	// 	 console.log(obj === "mrole")
    //    //return obj === "mrole"
    //  });
	 console.log(arrAssign.mrole)
	 console.log(arrAssign)
	 if(typeof arrAssign.mrole !== 'undefined'){
		 if(arrAssign.mrole===true)
			 mrole ={
			name: 'Role',
			url: '/role',
			icon: 'cil-folder',
			children: [
			  {
				name: 'Role List',
				url: '/role/role_list',
				icon: 'cil-folder'
			  }
			]
		  } 
	 }
	 
	 if(typeof arrAssign.muser !== 'undefined'){
		 if(arrAssign.muser===true)
			 muser = {
				name: 'User',
				url: '/user',
				icon: 'cil-user',
				children: [
				  {
					name: 'User List',
					url: '/user/user_list',
					icon: 'cil-user'
				  }
				]
			  }
	 }
	 
	 if(typeof arrAssign.memployee !== 'undefined'){
		 if(arrAssign.memployee===true)
			 memployee = {
				name: 'Employee',
				url: '/employee',
				icon: 'cil-group',
				children: [
				  {
					name: 'Employee List',
					url: '/employee/employee_list',
					icon: 'cil-group'
				  }
				]
			  }
	 }
	 
	 if(typeof arrAssign.mbranch !== 'undefined'){
		 if(arrAssign.mbranch===true)
			 mbranch = {
				name: 'Branch',
				url: '/branch',
				icon: 'cil-bookmark',
				children: [
				  {
					name: 'Branch List',
					url: '/branch/branch_list',
					icon: 'cil-bookmark'
				  }
				]
			  }
	 }
	 
	 if(typeof arrAssign.mcompany !== 'undefined'){
		 if(arrAssign.mcompany===true)
			 mcompany = {
				name: 'Company',
				url: '/company',
				icon: 'cil-building',
				children: [
				  {
					name: 'Company List',
					url: '/company/company_list',
					icon: 'cil-building'
				  }
				]
			  }
	 }

	 if(typeof arrAssign.massignment !== 'undefined'){
		if(arrAssign.massignment===true)
		    massignment = {
			   name: 'Assignment',
			   url: '/assignment',
			   icon: 'cil-spreadsheet',
			   children: [
				 {
				   name: 'Assignment List',
				   url: '/assignment/assignment_list',
				   icon: 'cil-spreadsheet'
				 }
			   ]
			 }
	}


  }
}
export const navItems: INavData[] = [
  mrole,
  muser,
  memployee,
  mbranch,
  mcompany,
  massignment,
  {
    divider: true
  }
];
