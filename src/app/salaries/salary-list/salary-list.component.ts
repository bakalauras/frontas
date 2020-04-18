import { Component, OnInit } from '@angular/core';
import { SalaryService } from '../shared/salary.service';
import { ToastrService } from 'ngx-toastr';
import { Salary } from '../shared/salary.model';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styles: []
})
export class SalaryListComponent extends KendoGridComponent implements OnInit {

  id = null;

  constructor(public service:SalaryService, private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      super();
      this.id = this.route.snapshot.paramMap.get('id'); 
    }

  ngOnInit() {
    this.service.refreshList(this.id, this.loadItems.bind(this));
    this.resetForm();
  }

  populateForm(pd:Salary){
    this.service.formData = Object.assign({}, pd);
    this.opened2 = true;
  }

  onDelete(){
    this.opened = false;
    if(this.idToDelete!=0){
      this.service.deleteSalary(this.idToDelete)
      .subscribe(res =>{
        this.toastr.success('Įrašas sėkmingai ištrintas');
        this.service.refreshList(this.id, this.loadItems.bind(this));
      },
        err => {
          console.log(err);
          this.toastr.error(err.error);
        })
    }
  }
  
  resetForm(form?:NgForm) {
    if(form!=null)
      form.resetForm();
    this.service.formData = {
      SalaryId: 0,
      Staff: null,
      EmployeeSalary: null,
      DateFrom: null,
      DateTo: null,
      EmployeeId: this.id
    }
  }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.SalaryId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
      this.close();
  }

  insertRecord(form:NgForm)
  {
    this.service.postSalary().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.success('Įrašas sėkmingai pridėtas');
        this.service.refreshList(this.id, this.loadItems.bind(this));
      },
      err => {
        console.log(err);
        this.toastr.error(err.error);
      }
    )
  }

  updateRecord(form:NgForm)
  {
    this.service.putSalary().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.success('Įrašas sėkmingai atnaujintas');
        this.service.refreshList(this.id, this.loadItems.bind(this));
      },
      err => {
        console.log(err);
        this.toastr.error(err.error);
      }
    )
  }
}
