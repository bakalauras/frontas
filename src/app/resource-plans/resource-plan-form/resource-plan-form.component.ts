import { Component, OnInit } from '@angular/core';
import { ResourcePlanService } from '../shared/resource-plan.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resource-plan-form',
  templateUrl: './resource-plan-form.component.html',
  styles: []
})
export class ResourcePlanFormComponent implements OnInit {

  id2 = null;
  constructor(public service: ResourcePlanService,
    private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      this.id2 = this.route.snapshot.paramMap.get('id2');
    }

  ngOnInit() {
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
      Price : 0,
      ProjectStageId : this.id2,
      EmployeeRoleId : 0,
      EmployeeRole : null
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
        //this.service.refreshList(this.id2);
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
       // this.service.refreshList(this.id2);
      },
      err => {
        console.log(err)
        this.toastr.error(err.error);
      }
    )
  }

}
