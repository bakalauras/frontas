import { Component, OnInit } from '@angular/core';
import { StageProgressService } from '../shared/stage-progress.service';
import { ToastrService } from 'ngx-toastr';
import { StageProgress } from '../shared/stage-progress.model';

@Component({
  selector: 'app-stage-progress-list',
  templateUrl: './stage-progress-list.component.html',
  styles: []
})
export class StageProgressListComponent implements OnInit {

  constructor(public service : StageProgressService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshProjectStageList();
    this.service.refreshList();
  }

  populateForm(pd:StageProgress)
  {
    this.service.formData = Object.assign({},pd);
  }

  onDelete(StageProgressId)
  {
    if(confirm('Ar tikrai norite ištrinti šį įrašą?')){
    this.service.deleteRecord(StageProgressId)
    .subscribe(
      res => {
        this.toastr.info('Įrašas sėkmingai ištrintas');
        this.service.refreshProjectStageList();
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
