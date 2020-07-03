import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Group } from 'src/app/groups/shared/group.model';
import { WorkingTimeRegister } from 'src/app/working-time-registers/shared/working-time-register.model';
import { Department } from 'src/app/departments/shared/department.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData:Employee
  //testas:Employee
  readonly rootURL = environment.rootURL;
  list:Employee[];
  name:string;
  param:string;
  groupsList:Group[];
  listWork: WorkingTimeRegister[];
  departmentsList: Department[];

  constructor(private http:HttpClient) { }

  postEmployee(){
    return this.http.post<{EmployeeId : number}>(this.rootURL + '/Employees', this.formData)
  }

  putEmployee(){
    return this.http.put(this.rootURL + '/Employees/'+ this.formData.EmployeeId, this.formData)
  }

  deleteEmployee(id){
    return this.http.delete(this.rootURL + '/Employees/'+ id)
  }

  refreshList(callback){
    this.http.get(this.rootURL + '/Employees')
    .toPromise()
    .then(res =>{this.list = res as Employee[], callback(this)})
  }

  refreshProjectsList(id, callback){
    this.http.get(this.rootURL + '/Employees/'+ id + '/projects')
    .toPromise()
    .then(res =>{this.listWork = res as WorkingTimeRegister[], callback(this)})
  }

  getDataa(id){
    return this.http.get<WorkingTimeRegister[]>(this.rootURL + '/Employees/'+ id +'/projects');
    
  }

  getActiveParam(active:boolean)
  {
    if(active == true)
      return "Aktyvus";
    else return "Neaktyvus";
  }

  getManager(formData:Employee)
  {
     if(formData.FkEmployeeId != 0)
     {
      return this.list.find(x => x.EmployeeId == formData.FkEmployeeId).Name +" " + this.list.find(x => x.EmployeeId == formData.FkEmployeeId).Surname;
     }
     else return null;
    
  }

  getEmployee(id:number)
  {
    return this.list.find(x => x.EmployeeId == id).Name +" " + this.list.find(x => x.EmployeeId == id).Surname;
  }

  getRecord(id){
    if(id!=0)
    {
      this.http.get(this.rootURL+'/Employees/'+id).
    toPromise()
    .then(res => this.formData = res as Employee);
    }
  }

  refreshDepartmentsList()
  {
    this.http.get(this.rootURL+'/Departments').
    toPromise()
    .then(res => this.departmentsList = res as Department[]);
  }
}
