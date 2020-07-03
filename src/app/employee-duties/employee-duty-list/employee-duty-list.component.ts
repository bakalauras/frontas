import { Component, OnInit } from '@angular/core';
import { EmployeeDutyService } from '../shared/employee-duty.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeDuty } from '../shared/employee-duty.model';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-duty-list',
  templateUrl: './employee-duty-list.component.html',
  styles: []
})
export class EmployeeDutyListComponent extends KendoGridComponent implements OnInit {
  id = null;

  constructor(public service:EmployeeDutyService, private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      super();
      this.id = this.route.snapshot.paramMap.get('id'); 
    }

  ngOnInit(){
    this.service.refreshList(this.id, this.loadItems.bind(this));
    this.service.refreshDutyList();
    this.service.refreshEmployeeteList();
    this.resetForm();
  }

  populateForm(pd:EmployeeDuty){
    this.service.formData = Object.assign({}, pd);
    this.opened2 = true;
  }

  onDelete(){
    this.opened = false;
    if(this.idToDelete!=0){
      this.service.deleteEmployeeDuty(this.idToDelete)
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
      EmployeeDutyId: 0,
      DateFrom: null,
      DateTo: null,
      Staff: null,
      Duty: null,
      DutyId: null,
      Employee: null,
      EmployeeId: this.id
    }
  }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.EmployeeDutyId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
      this.close();
  }

  insertRecord(form:NgForm)
  {
    this.service.postEmployeeDuty().subscribe(
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
    this.service.putEmployeeDuty().subscribe(
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
