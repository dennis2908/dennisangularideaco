import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent {
  //attemptSubmit
  userForm=[] 
  username
  myform = {} as any;
  
  constructor(private router: Router) {
	  
  }
    
  ngOnInit(): void {
	
  }

 onSubmit(event){
	event.preventDefault()
	
	console.log(23123132);
    //this.attemptSubmit = true
	if(this.myform.username==="console" && this.myform.password==="myconsole"){
			localStorage.setItem('angularData', window.btoa(window.btoa(window.btoa(window.btoa( "console" )))));
			//this.myform={} as any;
			 window.location.href="../";
			//console.log(localStorage.getItem("myData"));
		}
	event.preventDefault()
  }
  hasWhiteSpace(s) {
    return /\s/g.test(s);
  }

}
