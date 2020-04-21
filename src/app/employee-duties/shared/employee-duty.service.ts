import { Injectable } from '@angular/core';
import { EmployeeDuty } from './employee-duty.model';
import { environment } from 'src/environments/environment';
import { Duty } from 'src/app/duties/shared/duty.model';
import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/app/employees/shared/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDutyService {
  formData:EmployeeDuty
  readonly rootURL = environment.rootURL;
  list:EmployeeDuty[];
  dutyList:Duty[];
  employeeList:Employee[];

  constructor(private http:HttpClient) { }

  postEmployeeDuty(){
    return this.http.post(this.rootURL + '/EmployeeDuties', this.formData)
  }

  putEmployeeDuty(){
    return this.http.put(this.rootURL + '/EmployeeDuties/'+ this.formData.EmployeeDutyId, this.formData)
  }

  deleteEmployeeDuty(id){
    return this.http.delete(this.rootURL + '/EmployeeDuties/'+ id)
  }

  refreshList(id, callBack){
    this.http.get(this.rootURL + '/Employees/'+id+"/duties")
    .toPromise()
    .then(res =>{this.list = res as EmployeeDuty[], callBack(this)})
  }

  refreshDutyList()
  {
    this.http.get(this.rootURL+'/Duties').
    toPromise()
    .then(res => this.dutyList = res as Duty[]);
  }

  refreshEmployeeteList()
  {
    this.http.get(this.rootURL+'/Employees').
    toPromise()
    .then(res => this.employeeList = res as Employee[]);
  }

  getDutyTitle(id)
  {
    return this.dutyList.find(x => x.DutyId == id).Title;
  }
}
