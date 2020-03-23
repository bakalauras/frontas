import { Component, OnInit } from '@angular/core';
import { ResourcePlanService } from '../shared/resource-plan.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-resource-plan-form',
  templateUrl: './resource-plan-form.component.html',
  styles: []
})
export class ResourcePlanFormComponent implements OnInit {

  constructor(public service: ResourcePlanService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshProjectStageList();
    this.service.refreshEmployeeRoleList();
    this.resetForm();
    
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      ResourcePlanId : 0,
      DateFrom : null,
      DateTo : null,
      Hours : 0,
      ProjectStageId : 0,
      EmployeeRoleId : 0
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.ResourcePlanId ==0)
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
