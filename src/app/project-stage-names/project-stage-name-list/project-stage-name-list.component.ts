import { Component, OnInit } from '@angular/core';
import { ProjectStageNameService } from '../shared/project-stage-name.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectStageName } from '../shared/project-stage-name.model';

@Component({
  selector: 'app-project-stage-name-list',
  templateUrl: './project-stage-name-list.component.html',
  styles: []
})
export class ProjectStageNameListComponent implements OnInit {

  constructor(public service : ProjectStageNameService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(pd:ProjectStageName)
  {
    this.service.formData = Object.assign({},pd);
  }

  onDelete(ProjctStageNameId)
  {
    if(confirm('Ar tikrai norite ištrinti šį įrašą?')){
    this.service.deleteName(ProjctStageNameId)
    .subscribe(
      res => {
        this.toastr.info('Įrašas sėkmingai ištrintas');
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
