import { Component, OnInit } from '@angular/core';
import { CompetencyService } from '../shared/competency.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-competency',
  templateUrl: './competency.component.html',
  styles: []
})
export class CompetencyComponent implements OnInit {

  constructor(public service:CompetencyService, private toastr: ToastrService) { }

  ngOnInit(){
    this.resetForm();
  }

  resetForm(form?:NgForm) {
    if(form!=null)
      form.resetForm();
    this.service.formData = {
      CompetencyId: 0,
      Title: ''
    }
  }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.CompetencyId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form:NgForm)
  {
    this.service.postCompetency(form.value).subscribe(
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
    this.service.putCompetency(form.value).subscribe(
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
