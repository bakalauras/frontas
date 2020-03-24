import { Component, OnInit } from '@angular/core';
import { ContestFileService } from '../shared/contest-file.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contest-file-form',
  templateUrl: './contest-file-form.component.html',
  styles: []
})
export class ContestFileFormComponent implements OnInit {

  constructor(public service: ContestFileService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshContestList();
    this.resetForm();
    
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      ContestFileId : 0,
      Description : '',
      FileName : '',
      ContestId : 0
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.ContestFileId ==0)
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
