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
  //stageList:ProjectStage[];
  //stageNameList: ProjectStageName[];

  constructor(private http:HttpClient) { }

  postStageCompetency(){
    return this.http.post(this.rootURL + '/StageCompetencies', this.formData)
  }

  putStageCompetency(){
    return this.http.put(this.rootURL + '/StageCompetencies/'+ this.formData.StageCompetencyId, this.formData)
  }

  deleteStageCompetency(id){
    return this.http.delete(this.rootURL + '/StageCompetencies/'+ id)
  }

  refreshList(id, callBack)
  {
    if(id!=0)
    {
      this.http.get(this.rootURL+'/ProjectStages/'+id+'/competencies').
    toPromise()
    .then(res => {this.list=res as StageCompetency[], callBack(this)});
    }
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
