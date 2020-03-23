import { Component, OnInit } from '@angular/core';
import { TenderService } from '../shared/tender.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tender-form',
  templateUrl: './tender-form.component.html',
  styles: []
})
export class TenderFormComponent implements OnInit {

  constructor(public service: TenderService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshContestsList();
    this.service.refreshTenderStateList();
    this.resetForm();
    
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      TenderId : 0,
      TenderState : 0,
      Price : 0,
      FillingDate : null,
      ContestId : 0
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.TenderId ==0)
      this.insert(form);
    else
      this.update(form);
  }

  insert(form:NgForm)
  {
    this.service.postRecord().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Įrašas sėkmingai pridėtas');
        this.service.refreshList();
      },
      err => {
        console.log(err)
        this.toastr.error('Įvyko klaida');
      }
    )
  }

  update(form:NgForm)
  {
    this.service.putRecord().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Įrašas sėkmingai atnaujintas');
        this.service.refreshList();
      },
      err => {
        console.log(err)
        this.toastr.error('Įvyko klaida');
      }
    )
  }

}
