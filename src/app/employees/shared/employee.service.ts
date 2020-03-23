import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData:Employee
  readonly rootURL = environment.rootURL;
  list:Employee[];

  constructor(private http:HttpClient) { }

  postEmployee(formData:Employee){
    return this.http.post(this.rootURL + '/Employees', this.formData)
  }

  putEmployee(formData:Employee){
    console.log(formData);
    return this.http.put(this.rootURL + '/Employees/'+ this.formData.EmployeeId, this.formData)
  }

  deleteEmployee(id){
    return this.http.delete(this.rootURL + '/Employees/'+ id)
  }

  refreshList(){
    this.http.get(this.rootURL + '/Employees')
    .toPromise()
    .then(res =>this.list=res as Employee[])
  }
}
