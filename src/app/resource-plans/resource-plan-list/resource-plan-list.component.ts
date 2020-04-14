import { Component, OnInit } from '@angular/core';
import { ResourcePlanService } from '../shared/resource-plan.service';
import { ToastrService } from 'ngx-toastr';
import { ResourcePlan } from '../shared/resource-plan.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';

@Component({
  selector: 'app-resource-plan-list',
  templateUrl: './resource-plan-list.component.html',
  styles: []
})
export class ResourcePlanListComponent extends KendoGridComponent implements OnInit {

  id = null;
  constructor(public service : ResourcePlanService, private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      super();
      this.id = this.route.snapshot.paramMap.get('id2'); //get id parameter
    }

  ngOnInit() {
    this.service.refreshEmployeeRoleList();
    this.service.refreshList(this.id, this.loadItems.bind(this));
    this.resetForm();
  }

  populateForm(pd:ResourcePlan)
  {
    this.service.formData = Object.assign({},pd);
    this.opened2 = true;
  }

  onDelete()
  {
    this.opened = false;
    if(this.idToDelete!=0){
    this.service.deleteRecord(this.idToDelete)
    .subscribe(
      res => {
        this.toastr.info('Įrašas sėkmingai ištrintas');
        this.service.refreshEmployeeRoleList();
        this.service.refreshList(this.id, this.loadItems.bind(this));
      },
      err => {
        console.log(err)
        this.toastr.error(err.error);
      }
    )
    }
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
      ProjectStageId : this.id,
      EmployeeRoleId : 0
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.ResourcePlanId ==0)
      this.insert(form);
    else
      this.update(form);
    this.close();
  }

  insert(form:NgForm)
  {
    this.service.postRecord().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Įrašas sėkmingai pridėtas');
        this.service.refreshList(this.id, this.loadItems.bind(this));
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
        this.service.refreshList(this.id, this.loadItems.bind(this));
      },
      err => {
        console.log(err)
        this.toastr.error(err.error);
      }
    )
  }

}
