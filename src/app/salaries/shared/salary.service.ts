import { Injectable } from '@angular/core';
import { Salary } from './salary.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/app/employees/shared/employee.model';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  formData:Salary
  readonly rootURL = environment.rootURL;
  list:Salary[];

  constructor(private http:HttpClient) { }

  postSalary(){
    return this.http.post(this.rootURL + '/Salaries', this.formData)
  }

  putSalary(){
    return this.http.put(this.rootURL + '/Salaries/'+ this.formData.SalaryId, this.formData)
  }

  deleteSalary(id){
    return this.http.delete(this.rootURL + '/Salaries/'+ id)
  }

  refreshList(id, callBack){
    this.http.get(this.rootURL+'/Employees/'+id+'/salaries')
    .toPromise()
    .then(res =>{this.list = res as Salary[], callBack(this)})
  }
}
