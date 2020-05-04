import { Injectable } from '@angular/core';
import { Group } from './group.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  formData:Group
  readonly rootURL = environment.rootURL;
  list:Group[];

  constructor(private http:HttpClient) { }

  postGroup(){
    return this.http.post(this.rootURL + '/Groups', this.formData)
  }

  putGroup(){
    return this.http.put(this.rootURL + '/Groups/'+ this.formData.GroupId, this.formData)
  }

  deleteGroup(id){
    return this.http.delete(this.rootURL + '/Groups/'+ id)
  }

  refreshList(callBack){
    this.http.get(this.rootURL + '/Groups')
    .toPromise()
    .then(res =>{this.list = res as Group[], callBack(this)})
  }
}
