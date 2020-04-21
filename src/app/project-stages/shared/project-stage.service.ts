import { Injectable } from '@angular/core';
import { ProjectStage } from './project-stage.model';
import { environment } from 'src/environments/environment';
import { ProjectStageName } from 'src/app/project-stage-names/shared/project-stage-name.model';
import { Project } from 'src/app/projects/shared/project.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectStageService {

  formData:ProjectStage;
  readonly rootURL = environment.rootURL;
  list : ProjectStage[];
  list2: ProjectStageName[];
  list3: Project[];
  readonly apiName = '/ProjectStages';

  constructor(private http:HttpClient) { }

  postRecord(){
    return this.http.post<{ProjectStageId : number}>(this.rootURL+this.apiName,this.formData);
  }

  putRecord(){
    return this.http.put(this.rootURL+this.apiName+'/'+this.formData.ProjectStageId,this.formData);
  }

  deleteRecord(id){
    return this.http.delete(this.rootURL+ this.apiName+'/'+id);
  }

  getRecord(id){
    if(id!=0)
    {
      this.http.get(this.rootURL+this.apiName+'/'+id).
    toPromise()
    .then(res => this.formData = res as ProjectStage);
    }
  }

  refreshList(id, callBack)
  {
    if(id!=0)
    {
      this.http.get(this.rootURL+'/projects/'+id+'/projectStages').
    toPromise()
    .then(res => {this.list = res as ProjectStage[], callBack(this)});
    }
  }

  refreshProjectStageNamesList()
  {
    this.http.get(this.rootURL+'/ProjectStageNames').
    toPromise()
    .then(res => this.list2 = res as ProjectStageName[]);
  }

  refreshProjectsList()
  {
    this.http.get(this.rootURL+'/Projects').
    toPromise()
    .then(res => this.list3 = res as Project[]);
  }
}