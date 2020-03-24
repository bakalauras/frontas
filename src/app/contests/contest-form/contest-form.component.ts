import { Component, OnInit } from '@angular/core';
import { ContestService } from '../shared/contest.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contest-form',
  templateUrl: './contest-form.component.html',
  styles: []
})
export class ContestFormComponent implements OnInit {

  constructor(public service: ContestService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshContestStatusList();
    this.service.refreshCustomerList();
    this.resetForm();
    
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      ContestId : 0,
      Title : '',
      Budget : 0,
      PublicationDate : null,
      FillingDate : null,
      PriceRobbingDate : null,
      ClaimsFillingDate : null,
      CustomerId : 0,
      ContestStatusId : 0
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.ContestId ==0)
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
