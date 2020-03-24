import { Injectable } from '@angular/core';
import { Salary } from './salary.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  formData:Salary
  readonly rootURL = environment.rootURL;
  list:Salary[];

  constructor(private http:HttpClient) { }

  postSalary(formData:Salary){
    return this.http.post(this.rootURL + '/Salaries', this.formData)
  }

  putSalary(formData:Salary){
    console.log(formData);
    return this.http.put(this.rootURL + '/Salaries/'+ this.formData.SalaryId, this.formData)
  }

  deleteSalary(id){
    return this.http.delete(this.rootURL + '/Salaries/'+ id)
  }

  refreshList(){
    this.http.get(this.rootURL + '/Salaries')
    .toPromise()
    .then(res =>this.list=res as Salary[])
  }
}
