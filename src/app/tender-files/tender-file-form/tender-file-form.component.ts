import { Component, OnInit } from '@angular/core';
import { TenderFileService } from '../shared/tender-file.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tender-file-form',
  templateUrl: './tender-file-form.component.html',
  styles: []
})
export class TenderFileFormComponent implements OnInit {

  id = null;
  constructor(public service: TenderFileService,
    private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      this.id = this.route.snapshot.paramMap.get('id'); //get id parameter
    }

  ngOnInit() {
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
      TenderId : this.id
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
        //this.service.refreshList(this.id);
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
        //this.service.refreshList(this.id);
      },
      err => {
        console.log(err)
        this.toastr.error(err.error);
      }
    )
  }

}
