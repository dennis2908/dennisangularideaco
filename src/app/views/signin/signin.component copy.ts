import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { Store, select,State } from '@ngrx/store';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent {
  //attemptSubmit
  userForm=[] 
  username
  myform = {} as any;
  
  constructor(private router: Router,private store: Store<any>,private state: State<any>) {
	  localStorage.removeItem('angularJS')
  }
    
  ngOnInit(): void {
	
  }

 async onSubmit(event){
	event.preventDefault()
	
	console.log(23123132);
    //this.attemptSubmit = true
	
	if(this.myform.username && this.myform.password){
	   
			 fetch("http://localhost:8000/user/doLogin", {
						  method: "POST",
						  headers: {
							  'Accept': 'application/json',
							  'Content-Type': 'application/json',
							  'Access-Control-Allow-Headers':'*'
							},
							body: JSON.stringify(this.myform)
								}).then(res => res.json())
							  .then(
								async(result) => {
									//console.log(result)
									var arry = {authLogin: "",'authUserName': "",'authName': "",'authRoleName': "",'authRoleAssign' : {}};
									await localStorage.setItem('angularJS',JSON.stringify(arry))
									
									await this.store.dispatch({ type: 'CHANGE_STATE', payload: { authLogin:result.username,authUserName:result.username,authName:result.name,authRoleName:result.role_name,authRoleAssign:result.role_assign } })
									//console.log(this.store.select(x => this.state = x).subscribe())
									//console.log(this.state.value.cart)
									//localStorage.setItem('angularData', window.btoa(window.btoa(window.btoa(window.btoa( "console" )))));
			//this.myform={} as any;
									 window.location.href="../";
									
			  });
			
			//console.log(localStorage.getItem("myData"));
		}
		
		event.preventDefault()
  }
  hasWhiteSpace(s) {
    return /\s/g.test(s);
  }

}
