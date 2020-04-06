import { Component, OnInit } from '@angular/core';
import { StageCompetencyService } from '../shared/stage-competency.service';
import { ToastrService } from 'ngx-toastr';
import { StageCompetency } from '../shared/stage-competency.model';

@Component({
  selector: 'app-stage-competency-list',
  templateUrl: './stage-competency-list.component.html',
  styles: []
})
export class StageCompetencyListComponent implements OnInit {

  constructor(public service:StageCompetencyService, private toastr: ToastrService) { }

  ngOnInit(){
    this.service.refreshList();
  }

  populateForm(pd:StageCompetency){
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(StageCompetencyId){
    if(confirm('Ar tikrai norite ištrinti?')){
      this.service.deleteStageCompetency(StageCompetencyId)
      .subscribe(res =>{
        this.service.refreshList();
        this.toastr.success('Ištrinta sėkmingai');
      },
        err => {
          console.log(err);
          this.toastr.error('Įvyko klaida');
        })
    }
  }
}
