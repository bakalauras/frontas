import { Component, OnInit } from '@angular/core';
import { EmployeeCompetencyService } from '../shared/employee-competency.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-competency-form',
  templateUrl: './employee-competency-form.component.html',
  styles: []
})
export class EmployeeCompetencyFormComponent implements OnInit {

  constructor(public service:EmployeeCompetencyService, private toastr: ToastrService) { }

  ngOnInit(){
    this.service.refreshCompetencyList();
    this.service.refreshEmployeeteList();
    this.resetForm();
  }

  resetForm(form?:NgForm) {
    if(form!=null)
      form.resetForm();
    this.service.formData = {
      EmployeeCompetencyId: 0,
      DateFrom: null,
      DateTo: null,
      CompetencyId: null,
      EmployeeId: null
    }
  }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.EmployeeCompetencyId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form:NgForm)
  {
    this.service.postEmployeeCompetency(form.value).subscribe(
      res => {
        this.resetForm(form),
        this.toastr.success('Išsaugota sėkmingai');
        this.service.refreshList();
      },
      err => {
        console.log(err);
        this.toastr.error('Įvyko klaida');
      }
    )
  }

  updateRecord(form:NgForm)
  {
    this.service.putEmployeeCompetency(form.value).subscribe(
      res => {
        this.resetForm(form),
        this.toastr.info('Išsaugota sėkmingai');
        this.service.refreshList();
      },
      err => {
        console.log(err);
        this.toastr.error('Įvyko klaida');
      }
    )
  }

}
