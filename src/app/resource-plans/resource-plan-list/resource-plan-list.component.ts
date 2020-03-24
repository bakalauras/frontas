import { Component, OnInit } from '@angular/core';
import { ResourcePlanService } from '../shared/resource-plan.service';
import { ToastrService } from 'ngx-toastr';
import { ResourcePlan } from '../shared/resource-plan.model';

@Component({
  selector: 'app-resource-plan-list',
  templateUrl: './resource-plan-list.component.html',
  styles: []
})
export class ResourcePlanListComponent implements OnInit {

  constructor(public service : ResourcePlanService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshProjectStageList();
    this.service.refreshEmployeeRoleList();
    this.service.refreshList();
  }

  populateForm(pd:ResourcePlan)
  {
    this.service.formData = Object.assign({},pd);
  }

  onDelete(ResourcePlanId)
  {
    if(confirm('Ar tikrai norite ištrinti šį įrašą?')){
    this.service.deleteRecord(ResourcePlanId)
    .subscribe(
      res => {
        this.toastr.info('Įrašas sėkmingai ištrintas');
        this.service.refreshProjectStageList();
        this.service.refreshEmployeeRoleList();
        this.service.refreshList();
      },
      err => {
        console.log(err)
        this.toastr.error('Įvyko klaida');
      }
    )
    }
  }

}
