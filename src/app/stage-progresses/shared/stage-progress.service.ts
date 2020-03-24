import { Injectable } from '@angular/core';
import { StageProgress } from './stage-progress.model';
import { environment } from 'src/environments/environment';
import { ProjectStage } from 'src/app/project-stages/shared/project-stage.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StageProgressService {

  formData:StageProgress;
  readonly rootURL = environment.rootURL;
  list : StageProgress[];
  list2: ProjectStage[];
  readonly apiName = '/StageProgresses';

  constructor(private http:HttpClient) { }

  postRecord(){
    return this.http.post(this.rootURL+this.apiName,this.formData);
  }

  putRecord(){
    return this.http.put(this.rootURL+this.apiName+'/'+this.formData.StageProgressId,this.formData);
  }

  deleteRecord(id){
    return this.http.delete(this.rootURL+ this.apiName+'/'+id);
  }

  refreshList()
  {
    this.http.get(this.rootURL+this.apiName).
    toPromise()
    .then(res => this.list = res as StageProgress[]);
  }

  refreshProjectStageList()
  {
    this.http.get(this.rootURL+'/ProjectStages').
    toPromise()
    .then(res => this.list2 = res as ProjectStage[]);
  }
}
