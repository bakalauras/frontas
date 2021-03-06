import { Injectable } from '@angular/core';
import { Duty } from './duty.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DutyService {
  formData:Duty
  readonly rootURL = environment.rootURL;
  list:Duty[];

  constructor(private http:HttpClient) { }
  postDuty(){
    return this.http.post(this.rootURL + '/Duties', this.formData)
  }

  putDuty(){
    return this.http.put(this.rootURL + '/Duties/'+ this.formData.DutyId, this.formData)
  }

  deleteDuty(id){
    return this.http.delete(this.rootURL + '/Duties/'+ id)
  }

  refreshList(callBack){
    this.http.get(this.rootURL + '/Duties')
    .toPromise()
    .then(res =>{this.list = res as Duty[], callBack(this)})
  }
}
