import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute,Router,NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators,FormGroupDirective } from '@angular/forms';

import * as $ from 'jquery';

@Component({
  templateUrl: 'branch_list.component.html'
})
export class BranchListComponent{
	
   curPage = 1;	
   
   idDel = 1;
   
   m_role : any = {};
   
   modalDataTitle = ""
   
   modalType = "primary"
   
   sort_id = "asc"
   
   searchusername = ""
   
   searchfirstname = ""
   
   searchlastname = ""
   
   initialValues = []
   
   nextPageBtn = true
   
   prevPageBtn = true
   
   showModalAdd = false
   
   modalBtn = ""
   
   begPage = 1;
   
   showGroupErrorMessage = false
   
   keyword = 'name';
   formData:Array<any> =  [
          {id : ""},
		  {branch_name : ""}
	];
  
   selectEvent(item) {
    this.showGroupErrorMessage = false
  }
   
   perPage = 5;   
   
   
   maxPage = 0
   
   perPagination = 5;
   no = 1;
   data = [];
   
   dataLi=[];
   
   numbers:Array<any> = [];
	
   searchData = {branch_name:''};
	
   modalRef: BsModalRef;
  
   attemptSubmit
   
   attemptSubmitPassword = false
   
   spinnerHideShow = ""
  
   regUrl = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';	
  
   userForm: FormGroup
   formDirective: FormGroupDirective
   constructor(private route: ActivatedRoute,private router: Router,public formBuilder: FormBuilder,private modalService: BsModalService) {
	    if (this.router.getCurrentNavigation().extras.state) {
        let data = this.router.getCurrentNavigation().extras.state.data;
        this.searchData = data;
        
      }
	   this.numbers = Array.from({length:this.perPagination},(v,k)=>k+1);
	   this.MyfetchData(1);
	   this.searchData['namesort'] = "id"
	   this.searchData['ascdesc'] = "1"
   }
   
   openModalConfirm(id,template: TemplateRef<any>) {
	    this.idDel = id;
		this.modalRef = this.modalService.show(template);
   }
   
   openModalAddEdit(data,modalType,modalDataTitle,modalBtn,showModalAdd,template: TemplateRef<any>) {
	  this.showGroupErrorMessage = false 
	  this.modalType = modalType 
	  this.attemptSubmit = false;
	  this.modalDataTitle = modalDataTitle
	  this.modalBtn = modalBtn
	  this.modalRef = this.modalService.show(template); 
	  if(data==="")
		  data  = []
	  data['password'] = ""
	  this.formData = data
	  this.initForm();
	  Object.keys(this.userForm.controls).forEach(key => {
			this.userForm.get(key).setErrors(null) ;
	  });
	  
	  this.showModalAdd = showModalAdd
	  this.attemptSubmitPassword = false
	  
   }
   
   formatRupiah(angka, prefix){	
	return prefix+" "+ angka.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").replace(".","-").replace(/,/g, '.').replace("-",",");
  }
  
   
   openModalDetail(data,template: TemplateRef<any>) {
	  this.showModalAdd = false
	  this.attemptSubmit = false;
	  this.modalType = "warning"
	  this.modalRef = this.modalService.show(template);
	  this.formData = data;
	  this.initForm();
	  Object.keys(this.userForm.controls).forEach(key => {
			this.userForm.get(key).setErrors(null) ;
	  });

	  
   }
  
   ngOnInit(): void { 
    this.initForm();
	this.getTemplate();
	
	this.maxPage = (this.perPagination + this.begPage - 1)
	
    
  } 
  
  initForm(){
	  
	  this.userForm = this.formBuilder.group({
	  id: [''],	  
      branch_name: ['', [Validators.required, Validators.minLength(3)]]
	},{ updateOn: 'submit' });
	
  }
   
   get getControl(){
    return this.userForm.controls;
  }
  
  searchPage(){
	  
		this.curPage = 1
		this.begPage = 1
		this.nextPageBtn = true
		this.maxPage = this.perPagination
		this.activePage(this.curPage,event) 
  }
   async MyfetchData(page) {   
    this.numbers=[1,2,3,4,5]
    this.spinnerHideShow="display:block"

	let query = Object.keys(this.searchData)
				 .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(this.searchData[k]))
				 .join('&');

	let url = "http://localhost:8000/branch/get_data/"+(this.perPage*(page-1))+'/'+this.perPage+"/"+this.sort_id +"?"+ query;
	await fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
		  this.spinnerHideShow="display:block"	
		  let Datalist = []
		  for (var i = 0; i < result.length; i++) {
			   if(result[i]['birthdate']){
			    var mydate = new Date(result[i]['birthdate']);
				var month = ("0" + (mydate.getMonth() + 1)).slice(-2)
				var day = ("0" + mydate.getDate()).slice(-2)
				var year = mydate.getFullYear();
				const monthNames = ["January", "February", "March", "April", "May", "June",
				  "July", "August", "September", "October", "November", "December"
				];

				result[i]['birthdate'] = mydate.getFullYear()+'-'+ month +'-'+ day;
				result[i]['birthdateM'] = day+" "+ monthNames[mydate.getMonth()] +' '+ mydate.getFullYear();
			   }
				
		  }
		  this.data = result;
		  
		  if(result.length === 0){
			  if(this.curPage !== 1){
				this.curPage -= 1  
				this.maxPage = this.curPage;	
				this.MyfetchData(this.curPage)
				let perPagination = this.maxPage
				this.numbers = this.numbers.filter(function (val) { return val <= perPagination });		
				
			  }
			  else if(this.curPage===1){
				this.maxPage = 1;
			  }	
			  else{
				this.curPage = this.curPage - 1  
				this.maxPage = this.curPage;		
				this.MyfetchData(this.curPage)
				
						
			  } 
			
			  this.nextPageBtn = false; 
			  this.spinnerHideShow="display:block"
			  
			  
		  }
		  else if(result.length < this.perPage){
			  this.maxPage = this.curPage;
			  this.nextPageBtn = false;
			  let perPagination = this.curPage-this.perPagination;
			  this.numbers = this.numbers.filter(function (val) { return val <= perPagination });
			  if(this.begPage === this.maxPage){
				this.prevPageBtn = false;
			  }
		  }
		  else if(this.begPage > this.maxPage){
			  
			  this.begPage = this.maxPage - this.perPage + 1;
			  this.nextPageBtn = false;
		  }
		  else if(this.begPage < 1){
			 
			  this.begPage = 1;
			  this.maxPage = this.perPage;
			  this.nextPageBtn = true;
		  }
		  else if(this.begPage === this.maxPage){
			  //this.perPagination = 1;
			   console.log(3213123)
			   let perPagination = this.maxPage
			   this.prevPageBtn = false;
			 
			  this.numbers = this.numbers.filter(function (val) { return val <= perPagination });
		  }
		  else if(this.maxPage === 1){
			  this.prevPageBtn = false;
			  console.log(313123)
			  
			  
		  }

		  this.spinnerHideShow="display:none"
		  
		  
		});	
	
	}
	
	getTemplate(){
	    this.dataLi = [];	
		for(let i=0;i<4;i++){
		  this.dataLi.push('<li class="page-item"><a class="page-link" href="#"><a class="page-link" href="#">'+(i+1)+'</a></li>')	
			
		}
	}
	activePage(pg,event){
		this.spinnerHideShow="display:block"
		this.curPage=pg;
		if(this.curPage !== this.maxPage){
			this.nextPageBtn = true
		}
		this.MyfetchData(pg);	
		event.preventDefault();
	}
	
	prevPage(event){
		if(this.curPage !== this.begPage){
			this.activePage(this.curPage-1,event);
		}
		else{
			if(this.begPage!==1){
				this.begPage -= this.perPagination;
				this.maxPage = (this.perPagination + this.begPage - 1)
				this.activePage(this.curPage-1,event);
			}
		}
		this.nextPageBtn = true;
		event.preventDefault();
	}
	
	sortData(type,evt){
		evt.preventDefault()
		this.searchData['namesort']=type;
		if(this.searchData['namesort']===type){
			if(this.searchData['ascdesc']==="1")
				this.searchData['ascdesc']="2"
			else
				this.searchData['ascdesc']="1"
		}
		   
		else
		   this.searchData['ascdesc']="1"
		
		this.curPage = 1
		this.MyfetchData(this.curPage);	
		
	}
	
	
	
	nextPage(event){
		this.prevPageBtn = true
		if(this.curPage !== this.maxPage){
			this.activePage(this.curPage+1,event);
		}
		else{
			this.begPage = this.curPage+1;
			this.maxPage = (this.perPagination + this.begPage - 1)
			this.activePage(this.curPage+1,event);
		}
		
		event.preventDefault();
	}
	onChangeSearch(){
		this.showGroupErrorMessage = false
	}
	deleteItem(event){
		this.spinnerHideShow = "display:block"
		event.preventDefault();
		fetch("http://localhost:8000/branch/delete_data/"+this.idDel, {
						  method: "DELETE",
						  headers: {
							  'Accept': 'application/json',
							  'Content-Type': 'application/json',
							  'Access-Control-Allow-Headers':'*'
							}
								}).then(res => res.json())
							  .then(
								(result) => {
									this.activePage(this.curPage,event)
									this.spinnerHideShow = "display:none"
									this.modalRef.hide()
									
			  });
		
	}
  
  onSubmit(event: any){
	 if(this.showModalAdd){
		this.attemptSubmit = true
		this.showGroupErrorMessage = true 
	 }
	 this.attemptSubmitPassword = true
	  //this.modalService.show(ModalContentComponent);
	 if(this.userForm.valid){
		this.showGroupErrorMessage = false 
		var formData = {};
		formData['branch_name'] = this.userForm.controls['branch_name'].value;
		this.spinnerHideShow = "display:block"
		this.attemptSubmit = false
		if(this.userForm.controls['id'].value){
			fetch("http://localhost:8000/branch/update_data/"+this.userForm.controls['id'].value, {
						  method: "PUT",
						  headers: {
							  'Accept': 'application/json',
							  'Content-Type': 'application/json',
							  'Access-Control-Allow-Headers':'*'
							},
							body: JSON.stringify(formData)
								}).then(res => res.json())
							  .then(
								async(result) => {
									await this.activePage(this.curPage,event)
									await this.modalRef.hide()
									
									
			  });
		}
		else
		{
				
			fetch("http://localhost:8000/branch/save_data", {
						  method: "POST",
						  headers: {
							  'Accept': 'application/json',
							  'Content-Type': 'application/json',
							  'Access-Control-Allow-Headers':'*'
							},
							body: JSON.stringify(formData)
								}).then(res => res.json())
							  .then(
								async(result) => {
									 this.searchData['namesort'] = "id"
									 this.searchData['ascdesc'] = "1"
									 this.curPage = 1
									 this.begPage = 1
									 this.nextPageBtn = true
									 this.maxPage = this.perPagination
									 await this.activePage(this.curPage,event) 
									 await this.modalRef.hide()
									
			  });
        }		 
        this.spinnerHideShow = "display:none"		
	 }
	 
	 
  }

}
