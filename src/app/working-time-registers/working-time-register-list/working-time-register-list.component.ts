import { Component, OnInit } from '@angular/core';
import { WorkingTimeRegisterService } from '../shared/working-time-register.service';
import { ToastrService } from 'ngx-toastr';
import { WorkingTimeRegister } from '../shared/working-time-register.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';
import * as moment from 'moment-business-days';

@Component({
  selector: 'app-working-time-register-list',
  templateUrl: './working-time-register-list.component.html',
  styles: []
})
export class WorkingTimeRegisterListComponent extends KendoGridComponent implements OnInit {

  id = null;
  constructor(public service : WorkingTimeRegisterService, private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      super();
      this.id = this.route.snapshot.paramMap.get('id2'); //get id parameter
    }


  ngOnInit() {
    this.service.refreshEmployeeRoleList();
    this.service.refreshEmployeeList();
    this.service.refreshList(this.id, this.loadItems.bind(this));
    this.resetForm();
  }

  populateForm(pd:WorkingTimeRegister)
  {
    this.service.formData = Object.assign({},pd);
    this.opened2 = true;
  }

  onDelete()
  {
    this.opened = false;
    if(this.idToDelete!=0){
    this.service.deleteRecord(this.idToDelete)
    .subscribe(
      res => {
        this.toastr.success('Įrašas sėkmingai ištrintas');
        this.service.refreshEmployeeRoleList();
        this.service.refreshList(this.id, this.loadItems.bind(this));
      },
      err => {
        console.log(err)
        this.toastr.error(err.error);
      }
    )
    }
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      WorkingTimeRegisterId : 0,
      DateFrom : null,
      DateTo : null,
      Hours : 0,
      Price :0,
      ProjectStageId : this.id,
      EmployeeRoleId : null,
      EmployeeId : null,
      EmployeeRole : null,
      Employee : null
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.WorkingTimeRegisterId ==0)
      this.insert(form);
    else
      this.update(form);
    this.close();
  }

  insert(form:NgForm)
  {
    this.service.postRecord().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Įrašas sėkmingai pridėtas');
        this.service.refreshList(this.id, this.loadItems.bind(this));
      },
      err => {
        console.log(err)
        this.toastr.error(err.error);
      }
    )
  }

  update(form:NgForm)
  {
    this.service.putRecord().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Įrašas sėkmingai atnaujintas');
        this.service.refreshList(this.id, this.loadItems.bind(this));
      },
      err => {
        console.log(err)
        this.toastr.error(err.error);
      }
    )
  }

  getDateDiff()
  {
    if(this.service.formData.WorkingTimeRegisterId==0 && this.service.formData.DateFrom != null && this.service.formData.DateTo != null)
      this.service.formData.Hours = moment(this.service.formData.DateTo, 'YYYY-MM-DD').businessDiff(moment(this.service.formData.DateFrom,'YYYY-MM-DD'))*8;
  }
}
