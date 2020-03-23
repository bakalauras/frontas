import { Component, OnInit } from '@angular/core';
import { TenderFileService } from '../shared/tender-file.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tender-file-form',
  templateUrl: './tender-file-form.component.html',
  styles: []
})
export class TenderFileFormComponent implements OnInit {

  constructor(public service: TenderFileService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshTenderList();
    this.resetForm();
    
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      TenderFileId : 0,
      Description : '',
      FileName : '',
      TenderId : 0
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.TenderFileId ==0)
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
