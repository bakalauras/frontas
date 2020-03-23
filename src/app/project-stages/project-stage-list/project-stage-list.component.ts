import { Component, OnInit } from '@angular/core';
import { ProjectStageService } from '../shared/project-stage.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectStage } from '../shared/project-stage.model';

@Component({
  selector: 'app-project-stage-list',
  templateUrl: './project-stage-list.component.html',
  styles: []
})
export class ProjectStageListComponent implements OnInit {

  constructor(public service : ProjectStageService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshProjectStageNamesList();
    this.service.refreshProjectsList();
    this.service.refreshList();
  }

  populateForm(pd:ProjectStage)
  {
    this.service.formData = Object.assign({},pd);
  }

  onDelete(ProjectStageId)
  {
    if(confirm('Ar tikrai norite ištrinti šį įrašą?')){
    this.service.deleteRecord(ProjectStageId)
    .subscribe(
      res => {
        this.toastr.info('Įrašas sėkmingai ištrintas');
        this.service.refreshProjectStageNamesList();
        this.service.refreshProjectsList();
        this.service.refreshList();
      },
      err => {
        console.log(err)
        this.toastr.error('Įvyko klaida');
      }
    )
    }
  }

}
