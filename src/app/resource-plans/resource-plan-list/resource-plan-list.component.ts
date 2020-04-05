import { Component, OnInit } from '@angular/core';
import { ResourcePlanService } from '../shared/resource-plan.service';
import { ToastrService } from 'ngx-toastr';
import { ResourcePlan } from '../shared/resource-plan.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resource-plan-list',
  templateUrl: './resource-plan-list.component.html',
  styles: []
})
export class ResourcePlanListComponent implements OnInit {

  id = null;
  constructor(public service : ResourcePlanService, private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      this.id = this.route.snapshot.paramMap.get('id2'); //get id parameter
    }

  ngOnInit() {
    this.service.refreshEmployeeRoleList();
    this.service.refreshList(this.id);
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
        this.service.refreshEmployeeRoleList();
        this.service.refreshList(this.id);
      },
      err => {
        console.log(err)
        this.toastr.error('Įvyko klaida');
      }
    )
    }
  }

}
