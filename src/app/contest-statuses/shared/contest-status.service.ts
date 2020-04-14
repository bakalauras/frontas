import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContestStatus } from './contest-status.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContestStatusService {

  formData:ContestStatus;
  readonly rootURL = environment.rootURL;
  list : ContestStatus[];
  readonly apiName = '/ContestStatus';

  constructor(private http:HttpClient) { }

  postStatus(){
    return this.http.post(this.rootURL+this.apiName,this.formData);
  }

  putStatus(){
    return this.http.put(this.rootURL+this.apiName+'/'+this.formData.ContestStatusId,this.formData);
  }

  deleteStatus(id){
    return this.http.delete(this.rootURL+ this.apiName+'/'+id);
  }

  refreshList(callBack)
  {
    this.http.get(this.rootURL+this.apiName).
    toPromise()
    .then(res => {this.list = res as ContestStatus[], callBack(this)});
  }
}
