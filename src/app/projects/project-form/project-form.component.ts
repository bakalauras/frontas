import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styles: []
})
export class ProjectFormComponent implements OnInit {

  constructor(public service: ProjectService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshTenderList();
    this.service.refreshCustomerList();
    this.resetForm();
    
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      ProjectId : 0,
      Title : '',
      ContractNumber : '',
      Budget : 0,
      CustomerId : 0,
      TenderId : 0
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.ProjectId ==0)
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
