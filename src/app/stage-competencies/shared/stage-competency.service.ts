import { Injectable } from '@angular/core';
import { StageCompetency } from './stage-competency.model';
import { environment } from 'src/environments/environment';
import { Competency } from 'src/app/competencies/shared/competency.model';
import { ProjectStage } from 'src/app/project-stages/shared/project-stage.model';
import { HttpClient } from '@angular/common/http';
import { ProjectStageName } from 'src/app/project-stage-names/shared/project-stage-name.model';

@Injectable({
  providedIn: 'root'
})
export class StageCompetencyService {

  formData:StageCompetency
  readonly rootURL = environment.rootURL;
  list:StageCompetency[];
  competencyList:Competency[];
  stageList:ProjectStage[];
  stageNameList: ProjectStageName[];

  constructor(private http:HttpClient) { }

  postStageCompetency(formData:StageCompetency){
    return this.http.post(this.rootURL + '/StageCompetencies', this.formData)
  }

  putStageCompetency(formData:StageCompetency){
    console.log(formData);
    return this.http.put(this.rootURL + '/StageCompetencies/'+ this.formData.StageCompetencyId, this.formData)
  }

  deleteStageCompetency(id){
    return this.http.delete(this.rootURL + '/StageCompetencies/'+ id)
  }

  refreshList(){
    this.http.get(this.rootURL + '/StageCompetencies')
    .toPromise()
    .then(res =>this.list=res as StageCompetency[])
  }

  refreshCompetencyList()
  {
    this.http.get(this.rootURL+'/Competencies').
    toPromise()
    .then(res => this.competencyList = res as Competency[]);
  }

  refreshStageList()
  {
    this.http.get(this.rootURL+'/ProjectStages').
    toPromise()
    .then(res => this.stageList = res as ProjectStage[]);
  }

  refreshStageNameList()
  {
    this.http.get(this.rootURL+'/ProjectStageNames').
    toPromise()
    .then(res => this.stageNameList = res as ProjectStageName[]);
  }

  getProjectStageName(id)
  {
      var nr = this.stageList.find(x => x.ProjectStageId == id).ProjectStageNameId;
       return this.stageNameList.find(x => x.ProjctStageNameId == nr).StageName;
  }
  
  getCompetencyTitle(id)
  {
        return this.competencyList.find(x => x.CompetencyId == id).Title;
  }
}
