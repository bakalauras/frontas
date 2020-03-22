import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContestStatusService } from '../shared/contest-status.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contest-status-form',
  templateUrl: './contest-status-form.component.html',
  styles: []
})
export class ContestStatusFormComponent implements OnInit {

  constructor(public service: ContestStatusService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      ContestStatusId : 0,
      StatusName : ''
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.ContestStatusId ==0)
      this.insert(form);
    else
      this.update(form);
  }

  insert(form:NgForm)
  {
    this.service.postStatus().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Būsena sėkmingai pridėta');
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
    this.service.putStatus().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Būsena sėkmingai atnaujinta');
        this.service.refreshList();
      },
      err => {
        console.log(err)
        this.toastr.error('Įvyko klaida');
      }
    )
  }

}
