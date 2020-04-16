import { Component, OnInit } from '@angular/core';
import { DutyService } from '../shared/duty.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-duty',
  templateUrl: './duty.component.html',
  styles: []
})
export class DutyComponent implements OnInit {

  constructor(public service:DutyService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?:NgForm) {
    if(form!=null)
      form.resetForm();
    this.service.formData = {
      DutyId: 0,
      Title: ''
    }
  }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.DutyId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form:NgForm)
  {
    this.service.postDuty().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.success('Išsaugota sėkmingai');
        //this.service.refreshList();
      },
      err => {
        console.log(err);
        this.toastr.error('Įvyko klaida');
      }
    )
  }

  updateRecord(form:NgForm)
  {
    this.service.putDuty().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.info('Išsaugota sėkmingai');
        //this.service.refreshList();
      },
      err => {
        console.log(err);
        this.toastr.error('Įvyko klaida');
      }
    )
  }

}
