import { Injectable } from '@angular/core';
import { Department } from './department.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  formData: Department
  readonly rootURL = environment.rootURL;
  list:Department[];

  constructor(private http:HttpClient) { }

  postDepartment(){
    return this.http.post(this.rootURL + '/Departments', this.formData)
  }

  putDepartment(){
    return this.http.put(this.rootURL + '/Departments/'+ this.formData.DepartmentId, this.formData)
  }

  deleteDepartment(id:number){
    return this.http.delete(this.rootURL + '/Departments/'+ id)
  }

  refreshList(callBack){
    this.http.get(this.rootURL + '/Departments')
    .toPromise()
    .then(res =>{this.list = res as Department[], callBack(this)})
  }
}
