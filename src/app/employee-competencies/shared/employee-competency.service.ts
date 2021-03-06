import { Injectable } from '@angular/core';
import { EmployeeCompetency } from './employee-competency.model';
import { Competency } from 'src/app/competencies/shared/competency.model';
import { Employee } from 'src/app/employees/shared/employee.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeCompetencyService {

  formData:EmployeeCompetency
  readonly rootURL = environment.rootURL;
  list:EmployeeCompetency[];
  competencyList:Competency[];

  constructor(private http:HttpClient) { }

  postEmployeeCompetency(){
    return this.http.post(this.rootURL + '/EmployeeCompetencies', this.formData)
  }

  putEmployeeCompetency(){
    return this.http.put(this.rootURL + '/EmployeeCompetencies/'+ this.formData.EmployeeCompetencyId, this.formData)
  }

  deleteEmployeeCompetency(id){
    return this.http.delete(this.rootURL + '/EmployeeCompetencies/'+ id)
  }

  refreshList(id, callBack){
    this.http.get(this.rootURL + '/Employees/'+id+"/competencies")
    .toPromise()
    .then(res =>{this.list = res as EmployeeCompetency[], callBack(this)})
  }

  refreshCompetencyList()
  {
    this.http.get(this.rootURL+'/Competencies').
    toPromise()
    .then(res => this.competencyList = res as Competency[]);
  }

  getCompetencyTitle(id)
  {
    return this.competencyList.find(x => x.CompetencyId == id).Title;
  }
}
