import { Injectable } from '@angular/core';
import { Competency } from './competency.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompetencyService {

  formData:Competency
  readonly rootURL = environment.rootURL;
  list:Competency[];

  constructor(private http:HttpClient) { }

  postCompetency(){
    return this.http.post(this.rootURL + '/Competencies', this.formData)
  }

  putCompetency(){
    return this.http.put(this.rootURL + '/Competencies/'+ this.formData.CompetencyId, this.formData)
  }

  deleteCompetency(id){
    return this.http.delete(this.rootURL + '/Competencies/'+ id)
  }

  refreshList(callBack){
    this.http.get(this.rootURL + '/Competencies')
    .toPromise()
    .then(res =>{this.list = res as Competency[], callBack(this)})
  }
}
