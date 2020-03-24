import { Injectable } from '@angular/core';
import { WorkingTimeRegister } from './working-time-register.model';
import { environment } from 'src/environments/environment';
import { ProjectStage } from 'src/app/project-stages/shared/project-stage.model';
import { EmployeeRole } from 'src/app/employee-roles/shared/employee-role.model';
import { Employee } from 'src/app/employees/shared/employee.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkingTimeRegisterService {

  formData:WorkingTimeRegister;
  readonly rootURL = environment.rootURL;
  list : WorkingTimeRegister[];
  list2: ProjectStage[];
  list3: EmployeeRole[];
  list4: Employee[];
  readonly apiName = '/WorkingTimeRegisters';

  constructor(private http:HttpClient) { }

  postRecord(){
    return this.http.post(this.rootURL+this.apiName,this.formData);
  }

  putRecord(){
    return this.http.put(this.rootURL+this.apiName+'/'+this.formData.WorkingTimeRegisterId,this.formData);
  }

  deleteRecord(id){
    return this.http.delete(this.rootURL+ this.apiName+'/'+id);
  }

  refreshList()
  {
    this.http.get(this.rootURL+this.apiName).
    toPromise()
    .then(res => this.list = res as WorkingTimeRegister[]);
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

  refreshEmployeeList()
  {
    this.http.get(this.rootURL+'/Employees').
    toPromise()
    .then(res => this.list4 = res as Employee[]);
  }

  getEmployeeRoleName(id)
  {
        return this.list3.find(x => x.EmployeeRoleId == id).Title;
  }

  getEmployeeName(id)
  {
        var em = this.list4.find(x => x.EmployeeId == id);
        return em.Name+ " " + em.Surname;
  }

}
