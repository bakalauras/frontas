import { Component, OnInit } from '@angular/core';
import { StageCompetencyService } from '../shared/stage-competency.service';
import { ToastrService } from 'ngx-toastr';
import { StageCompetency } from '../shared/stage-competency.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stage-competency-list',
  templateUrl: './stage-competency-list.component.html',
  styles: []
})
export class StageCompetencyListComponent implements OnInit {

  id = null;
  constructor(public service:StageCompetencyService, private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      this.id = this.route.snapshot.paramMap.get('id2'); //get id parameter
    }


  ngOnInit(){
    this.service.refreshCompetencyList();
    this.service.refreshList(this.id);
  }

  populateForm(pd:StageCompetency){
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(StageCompetencyId){
    if(confirm('Ar tikrai norite ištrinti?')){
      this.service.deleteStageCompetency(StageCompetencyId)
      .subscribe(res =>{
        this.service.refreshList(this.id);
        this.toastr.success('Ištrinta sėkmingai');
      },
        err => {
          console.log(err);
          this.toastr.error('Įvyko klaida');
        })
    }
  }
}
