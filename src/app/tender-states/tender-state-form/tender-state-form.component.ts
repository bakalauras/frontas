import { Component, OnInit } from '@angular/core';
import { TenderStateService } from '../shared/tender-state.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tender-state-form',
  templateUrl: './tender-state-form.component.html',
  styles: []
})
export class TenderStateFormComponent implements OnInit {

  constructor(public service: TenderStateService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      TenderStateId : 0,
      Name : ''
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.TenderStateId ==0)
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
      //  this.service.refreshList();
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
      //  this.service.refreshList();
      },
      err => {
        console.log(err)
        this.toastr.error(err.error);
      }
    )
  }

}
