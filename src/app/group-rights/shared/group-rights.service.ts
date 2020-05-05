import { Injectable } from '@angular/core';
import { GroupRights } from './group-rights.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupRightsService {

  formData:GroupRights
  readonly rootURL = environment.rootURL;
  list:GroupRights[];

  constructor(private http:HttpClient) { }

  postGroupRights(){
    return this.http.post(this.rootURL + '/GroupRights', this.formData)
  }

  putGroupRights(){
    return this.http.put(this.rootURL + '/GroupRights/'+ this.formData.GroupRightId, this.formData)
  }

  deleteGroupRights(id){
    return this.http.delete(this.rootURL + '/GroupRights/'+ id)
  }

  refreshList(callBack){
    this.http.get(this.rootURL + '/GroupRights')
    .toPromise()
    .then(res =>{this.list = res as GroupRights[], callBack(this)})
  }
}
