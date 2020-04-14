import { Injectable } from '@angular/core';
import { ProjectStageName } from './project-stage-name.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectStageNameService {

  formData:ProjectStageName;
  readonly rootURL = environment.rootURL;
  list : ProjectStageName[];
  readonly apiName = '/ProjectStageNames';

  constructor(private http:HttpClient) { }

  postName(){
    return this.http.post(this.rootURL+this.apiName,this.formData);
  }

  putName(){
    return this.http.put(this.rootURL+this.apiName+'/'+this.formData.ProjctStageNameId,this.formData);
  }

  deleteName(id){
    return this.http.delete(this.rootURL+ this.apiName+'/'+id);
  }

  refreshList(callBack)
  {
    this.http.get(this.rootURL+this.apiName).
    toPromise()
    .then(res => {this.list = res as ProjectStageName[], callBack(this)});
  }
}
