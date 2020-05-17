import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Group } from 'src/app/groups/shared/group.model';

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
  groupsList:Group[]

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

  getActiveParam(active:boolean)
  {
    if(active == true)
      return "Aktyvus";
    else return "Neaktyvus";
    //return this.http.get(this.rootURL + '/Employees/'+ id+'/isActive').subscribe( res => this.param = res as string);;
  }

  getManager(id:number)
  {
     //this.http.get(this.rootURL + '/Employees/'+ id+'/manager';
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
}
