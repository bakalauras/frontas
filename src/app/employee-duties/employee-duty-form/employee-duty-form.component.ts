import { Component, OnInit } from '@angular/core';
import { EmployeeDutyService } from '../shared/employee-duty.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-duty-form',
  templateUrl: './employee-duty-form.component.html',
  styles: []
})
export class EmployeeDutyFormComponent implements OnInit {

  constructor(public service:EmployeeDutyService, private toastr: ToastrService) { }

  ngOnInit(){
    this.service.refreshDutyList();
    this.service.refreshEmployeeteList();
    this.resetForm();
  }

  resetForm(form?:NgForm) {
    if(form!=null)
      form.resetForm();
    this.service.formData = {
      EmployeeDutyId: 0,
      DateFrom: null,
      DateTo: null,
      DutyId: null,
      EmployeeId: null
    }
  }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.EmployeeDutyId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form:NgForm)
  {
    this.service.postEmployeeDuty().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.success('Išsaugota sėkmingai');
      //  this.service.refreshList();
      },
      err => {
        console.log(err);
        this.toastr.error('Įvyko klaida');
      }
    )
  }

  updateRecord(form:NgForm)
  {
    this.service.putEmployeeDuty().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.info('Išsaugota sėkmingai');
      //  this.service.refreshList();
      },
      err => {
        console.log(err);
        this.toastr.error('Įvyko klaida');
      }
    )
  }
}
