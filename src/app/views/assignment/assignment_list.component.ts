import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';

import * as $ from 'jquery';

@Component({
	templateUrl: 'assignment_list.component.html',
	// styleUrls: ['./assignment_list.component.css']

})
export class AssignmentListComponent {

	curPage = 1;

	idDel = 1;

	changeSel;

	changeIdSel;

	m_company: any = {};

	m_employee: any = {};

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

	testData = {
		0: 3,
		1: 7,
		2: 9,
		3: 5,
	}


	begPage = 1;

	showGroupErrorMessage = false

	keyword = 'name';
	formData: Array<any> = [
		{ id: "" },
		{ pic: "" },
		{ m_company: "" },
		{ employee: {} as any },
		{ assignment_name: "" }
	];


	selectEvent(item) {
		this.showGroupErrorMessage = false
	}

	perPage = 5;


	maxPage = 0

	perPagination = 5;
	no = 1;
	data = [];

	dataLi = [];

	numbers: Array<any> = [];

	emplnumbers: Array<any> = [];

	arrRemAss: Array<any> = [];

	arrEmplPos: Array<any> = [];

	arrEmplId: Array<any> = [];

	searchData = { company_name: '', pic: '', assignment_name: '' };

	modalRef: BsModalRef;

	attemptSubmit

	attemptSubmitPassword = false

	spinnerHideShow = ""


	btnadd = false

	btnedit = false

	btndelete = false

	regUrl = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

	userForm: FormGroup
	formDirective: FormGroupDirective
	constructor(private cdref: ChangeDetectorRef, private route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder, private modalService: BsModalService) {
		if (this.router.getCurrentNavigation().extras.state) {
			let data = this.router.getCurrentNavigation().extras.state.data;
			this.searchData = data;

		}
		this.numbers = Array.from({ length: this.perPagination }, (v, k) => k + 1);
		this.getMEmployee()
		this.getMCompany()
		this.MyfetchData(1);
		this.searchData['namesort'] = "id"
		this.searchData['ascdesc'] = "1"

		let arrAssign = JSON.parse(JSON.parse(localStorage.getItem("angularJS")).authRoleAssign)

		if (Object.keys(arrAssign).length > 0) {
			if (typeof arrAssign.assignmentadd !== 'undefined') {
				if (arrAssign.assignmentadd === true) {

					this.btnadd = true;
				}
			}
			if (typeof arrAssign.assignmentedit !== 'undefined') {
				if (arrAssign.assignmentedit === true) {

					this.btnedit = true;
				}
			}
			if (typeof arrAssign.assignmentdelete !== 'undefined') {
				if (arrAssign.assignmentdelete === true) {

					this.btndelete = true;
				}
			}
		}
	}

	ngAfterContentChecked() {
		this.cdref.detectChanges();
	}

	openModalConfirm(id, template: TemplateRef<any>) {
		this.idDel = id;
		this.modalRef = this.modalService.show(template);
	}

	openModalAddEdit(data, modalType, modalDataTitle, modalBtn, showModalAdd, template: TemplateRef<any>) {
		this.emplnumbers.length = 1
		this.showGroupErrorMessage = false
		this.modalType = modalType
		this.attemptSubmit = false;
		this.modalDataTitle = modalDataTitle
		this.modalBtn = modalBtn
		this.modalRef = this.modalService.show(template);
		this.arrRemAss = [] as any
		//this.formData = data

		if (data === "") {
			//this.formData.employee = {} as any
			//console.log(this.testData )
			this.formData['employee'] = {} as any
			this.arrEmplId = [] as any
			this.arrEmplPos = [] as any
			this.emplnumbers.length = 1
		}
		else {
			this.formData = data;
			this.emplnumbers.length = Object.keys(this.testData).length
		}
		this.initForm();
		Object.keys(this.userForm.controls).forEach(key => {
			this.userForm.get(key).setErrors(null);
		});

		this.showModalAdd = showModalAdd
		this.attemptSubmitPassword = false

	}

	formatRupiah(angka, prefix) {
		return prefix + " " + angka.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").replace(".", "-").replace(/,/g, '.').replace("-", ",");
	}


	openModalDetail(data, template: TemplateRef<any>) {
		this.showModalAdd = false
		this.attemptSubmit = false;
		this.modalType = "warning"
		this.modalRef = this.modalService.show(template);
		this.formData = data;
		this.initForm();
		Object.keys(this.userForm.controls).forEach(key => {
			this.userForm.get(key).setErrors(null);
		});


	}

	ngOnInit(): void {
		this.initForm();
		this.getTemplate();

		this.emplnumbers.length = 1

		this.maxPage = (this.perPagination + this.begPage - 1)


	}

	initForm() {

		this.userForm = this.formBuilder.group({
			id: [''],
			assignment_name: ['', [Validators.required, Validators.minLength(3)]],
			pic: ['', [Validators.required, Validators.minLength(3)]],
			m_company: ['', [Validators.required, Validators.minLength(1)]],
			m_employee: ['', [Validators.required, Validators.minLength(1)]]
		}, { updateOn: 'submit' });

	}

	get getControl() {
		return this.userForm.controls;
	}

	searchPage() {

		this.curPage = 1
		this.begPage = 1
		this.nextPageBtn = true
		this.maxPage = this.perPagination
		this.activePage(this.curPage, event)
	}
	async MyfetchData(page) {
		this.numbers = [1, 2, 3, 4, 5]
		this.spinnerHideShow = "display:block"

		let query = Object.keys(this.searchData)
			.map(k => encodeURIComponent(k) + '=' + encodeURIComponent(this.searchData[k]))
			.join('&');

		let url = "http://localhost:8000/assignment/get_data/" + (this.perPage * (page - 1)) + '/' + this.perPage + "/" + this.sort_id + "?" + query;
		await fetch(url)
			.then(res => res.json())
			.then(
				(result) => {
					this.spinnerHideShow = "display:block"
					let Datalist = []
					for (var i = 0; i < result.length; i++) {
						if (result[i]['birthdate']) {
							var mydate = new Date(result[i]['birthdate']);
							var month = ("0" + (mydate.getMonth() + 1)).slice(-2)
							var day = ("0" + mydate.getDate()).slice(-2)
							var year = mydate.getFullYear();
							const monthNames = ["January", "February", "March", "April", "May", "June",
								"July", "August", "September", "October", "November", "December"
							];

							result[i]['birthdate'] = mydate.getFullYear() + '-' + month + '-' + day;
							result[i]['birthdateM'] = day + " " + monthNames[mydate.getMonth()] + ' ' + mydate.getFullYear();
						}

					}
					this.data = result;

					if (result.length === 0) {
						if (this.curPage !== 1) {
							this.curPage -= 1
							this.maxPage = this.curPage;
							this.MyfetchData(this.curPage)
							let perPagination = this.maxPage
							this.numbers = this.numbers.filter(function (val) { return val <= perPagination });

						}
						else if (this.curPage === 1) {
							this.maxPage = 1;
						}
						else {
							this.curPage = this.curPage - 1
							this.maxPage = this.curPage;
							this.MyfetchData(this.curPage)


						}

						this.nextPageBtn = false;
						this.spinnerHideShow = "display:block"


					}
					else if (result.length < this.perPage) {
						this.maxPage = this.curPage;
						this.nextPageBtn = false;
						let perPagination = this.curPage - this.perPagination;
						this.numbers = this.numbers.filter(function (val) { return val <= perPagination });
						if (this.begPage === this.maxPage) {
							this.prevPageBtn = false;
						}
					}
					else if (this.begPage > this.maxPage) {

						this.begPage = this.maxPage - this.perPage + 1;
						this.nextPageBtn = false;
					}
					else if (this.begPage < 1) {

						this.begPage = 1;
						this.maxPage = this.perPage;
						this.nextPageBtn = true;
					}
					else if (this.begPage === this.maxPage) {
						//this.perPagination = 1;
						console.log(3213123)
						let perPagination = this.maxPage
						this.prevPageBtn = false;

						this.numbers = this.numbers.filter(function (val) { return val <= perPagination });
					}
					else if (this.maxPage === 1) {
						this.prevPageBtn = false;
						console.log(313123)


					}

					this.spinnerHideShow = "display:none"


				});

	}

	getTemplate() {
		this.dataLi = [];
		for (let i = 0; i < 4; i++) {
			this.dataLi.push('<li class="page-item"><a class="page-link" href="#"><a class="page-link" href="#">' + (i + 1) + '</a></li>')

		}
	}

	isSelected(terms: any) {
		return terms.id === '3';
	}

	incemplnumbers() {
		this.emplnumbers.length = this.emplnumbers.length + 1
		this.arrEmplPos[this.emplnumbers.length] = ""
	}

	assArrEmplPos(i, evt) {

		setTimeout(() => {

			//console.log(evt)
			let selemployee = this.m_employee.filter(function (selemployee) { return selemployee.id == evt });
			if (selemployee.length > 0) {
				console.log(22222, selemployee)
				//this.arrEmplPos[i]=selemployee[0]['groupdata']
				//evt.preventDefault()
				//let emp_id = evt.target.value.split(':')[1].replace(/\s+/g, '')
				if (evt && $('#selHid' + i).val()) {
					this.emplnumbers[i] = evt
					//console.log($('#selChDoc'+i).val())
					$('#selChDoc' + i).val(evt)

					//this.arrEmplId[i] = 3

					this.cdref.detectChanges();
				}

				else {
					$('#selHid' + i).val('')
					$('#selChDoc' + i).val('')
				}
			}
		}, 0)



	}


	assArrEmplPosChange(i, evt) {
		evt.preventDefault()
		//console.log(evt.target.value)
		let emp_id = evt.target.value
		//this.formData.employee[i] = emp_id

		if (emp_id) {
			let selemployee = this.m_employee.filter(function (selemployee) { return selemployee.id === emp_id });
			//	console.log(selemployee)
			this.arrEmplPos[i] = selemployee[0]['groupdata']
			this.formData['employee'][i] = emp_id
			this.cdref.detectChanges();
			if (!selemployee[0]['groupdata']) {
				$('#selHid' + i).val('')
				$('#selChDoc' + i).val('')
			}
		}
		else {
			$('#selHid' + i).val('')
			$('#selChDoc' + i).val('')
		}
		//console.log(this.formData.employee)

	}

	changeselData(i) {
		//console.log(i)
		this.arrEmplId[i] = i + 1
	}

	async getMCompany() {

		await fetch("http://localhost:8000/company/get_all_data")
			.then(res => res.json())
			.then(
				(result) => {
					this.m_company = result;

				})
	}

	async getMEmployee() {

		await fetch("http://localhost:8000/crud/get_all_data")
			.then(res => res.json())
			.then(
				(result) => {
					this.m_employee = result;

				})
	}


	activePage(pg, event) {
		this.spinnerHideShow = "display:block"
		this.curPage = pg;
		if (this.curPage !== this.maxPage) {
			this.nextPageBtn = true
		}
		this.MyfetchData(pg);
		event.preventDefault();
	}

	removeEmplnumbers(numb) {
		this.arrRemAss.push(numb)
	}

	prevPage(event) {
		if (this.curPage !== this.begPage) {
			this.activePage(this.curPage - 1, event);
		}
		else {
			if (this.begPage !== 1) {
				this.begPage -= this.perPagination;
				this.maxPage = (this.perPagination + this.begPage - 1)
				this.activePage(this.curPage - 1, event);
			}
		}
		this.nextPageBtn = true;
		event.preventDefault();
	}

	sortData(type, evt) {
		evt.preventDefault()
		this.searchData['namesort'] = type;
		if (this.searchData['namesort'] === type) {
			if (this.searchData['ascdesc'] === "1")
				this.searchData['ascdesc'] = "2"
			else
				this.searchData['ascdesc'] = "1"
		}

		else
			this.searchData['ascdesc'] = "1"

		this.curPage = 1
		this.MyfetchData(this.curPage);

	}



	nextPage(event) {
		this.prevPageBtn = true
		if (this.curPage !== this.maxPage) {
			this.activePage(this.curPage + 1, event);
		}
		else {
			this.begPage = this.curPage + 1;
			this.maxPage = (this.perPagination + this.begPage - 1)
			this.activePage(this.curPage + 1, event);
		}

		event.preventDefault();
	}
	onChangeSearch() {
		this.showGroupErrorMessage = false
	}
	deleteItem(event) {
		this.spinnerHideShow = "display:block"
		event.preventDefault();
		fetch("http://localhost:8000/branch/delete_data/" + this.idDel, {
			method: "DELETE",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Headers': '*'
			}
		}).then(res => res.json())
			.then(
				(result) => {
					this.activePage(this.curPage, event)
					this.spinnerHideShow = "display:none"
					this.modalRef.hide()

				});

	}

	onSubmit(event: any) {
		if (this.showModalAdd) {
			this.attemptSubmit = true
			this.showGroupErrorMessage = true
		}
		this.attemptSubmitPassword = true
		//this.modalService.show(ModalContentComponent);
		if (this.userForm.valid) {
			this.showGroupErrorMessage = false
			var formData = {};
			formData['assignment_name'] = this.userForm.controls['assignment_name'].value;
			formData['pic'] = this.userForm.controls['pic'].value;
			formData['m_company'] = this.userForm.controls['m_company'].value;
			formData['employee'] = this.formData['employee'];
			this.spinnerHideShow = "display:block"
			this.attemptSubmit = false
			if (this.userForm.controls['id'].value) {
				fetch("http://localhost:8000/assignment/update_data/" + this.userForm.controls['id'].value, {
					method: "PUT",
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Access-Control-Allow-Headers': '*'
					},
					body: JSON.stringify(formData)
				}).then(res => res.json())
					.then(
						async (result) => {
							await this.activePage(this.curPage, event)
							await this.modalRef.hide()


						});
			}
			else {

				fetch("http://localhost:8000/assignment/save_data", {
					method: "POST",
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Access-Control-Allow-Headers': '*'
					},
					body: JSON.stringify(formData)
				}).then(res => res.json())
					.then(
						async (result) => {
							this.searchData['namesort'] = "id"
							this.searchData['ascdesc'] = "1"
							this.curPage = 1
							this.begPage = 1
							this.nextPageBtn = true
							this.maxPage = this.perPagination
							await this.activePage(this.curPage, event)
							await this.modalRef.hide()

						});
			}
			this.spinnerHideShow = "display:none"
		}


	}

}
