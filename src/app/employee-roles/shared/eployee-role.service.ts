import { Injectable } from '@angular/core';
import { EmployeeRole } from './employee-role.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EployeeRoleService {

  formData:EmployeeRole;
  readonly rootURL = environment.rootURL;
  list : EmployeeRole[];
  readonly apiName = '/EmployeeRoles';

  constructor(private http:HttpClient) { }

  postRecord(){
    return this.http.post(this.rootURL+this.apiName,this.formData);
  }

  putRecord(){
    return this.http.put(this.rootURL+this.apiName+'/'+this.formData.EmployeeRoleId,this.formData);
  }

  deleteRecord(id){
    return this.http.delete(this.rootURL+ this.apiName+'/'+id);
  }

  refreshList(callBack)
  {
    this.http.get(this.rootURL+this.apiName).
    toPromise()
    .then(res => {this.list = res as EmployeeRole[], callBack(this)});
  }
}
