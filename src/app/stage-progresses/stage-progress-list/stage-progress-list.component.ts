import { Component, OnInit } from '@angular/core';
import { StageProgressService } from '../shared/stage-progress.service';
import { ToastrService } from 'ngx-toastr';
import { StageProgress } from '../shared/stage-progress.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stage-progress-list',
  templateUrl: './stage-progress-list.component.html',
  styles: []
})
export class StageProgressListComponent implements OnInit {

  id = null;
  constructor(public service : StageProgressService, private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      this.id = this.route.snapshot.paramMap.get('id2'); //get id parameter
    }

  ngOnInit() {
    this.service.refreshList(this.id);
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
        this.service.refreshList(this.id);
      },
      err => {
        console.log(err)
        this.toastr.error('Įvyko klaida');
      }
    )
    }
  }

}
