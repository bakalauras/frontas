import { Injectable } from '@angular/core';
import { ResourcePlan } from './resource-plan.model';
import { environment } from 'src/environments/environment';
import { ProjectStage } from 'src/app/project-stages/shared/project-stage.model';
import { EmployeeRole } from 'src/app/employee-roles/shared/employee-role.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResourcePlanService {

  formData:ResourcePlan;
  readonly rootURL = environment.rootURL;
  list : ResourcePlan[];
  list2: ProjectStage[];
  list3: EmployeeRole[];
  readonly apiName = '/ResourcePlans';

  constructor(private http:HttpClient) { }

  postRecord(){
    return this.http.post(this.rootURL+this.apiName,this.formData);
  }

  putRecord(){
    return this.http.put(this.rootURL+this.apiName+'/'+this.formData.ResourcePlanId,this.formData);
  }

  deleteRecord(id){
    return this.http.delete(this.rootURL+ this.apiName+'/'+id);
  }

  refreshList()
  {
    this.http.get(this.rootURL+this.apiName).
    toPromise()
    .then(res => this.list = res as ResourcePlan[]);
  }

  refreshProjectStageList()
  {
    this.http.get(this.rootURL+'/ProjectStages').
    toPromise()
    .then(res => this.list2 = res as ProjectStage[]);
  }

  refreshEmployeeRoleList()
  {
    this.http.get(this.rootURL+'/EmployeeRoles').
    toPromise()
    .then(res => this.list3 = res as EmployeeRole[]);
  }

  getEmployeeRoleName(id)
  {
        return this.list3.find(x => x.EmployeeRoleId == id).Title;
  }
}
