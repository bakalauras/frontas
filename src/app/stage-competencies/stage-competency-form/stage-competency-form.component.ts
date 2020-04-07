import { Component, OnInit } from '@angular/core';
import { StageCompetencyService } from '../shared/stage-competency.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stage-competency-form',
  templateUrl: './stage-competency-form.component.html',
  styles: []
})
export class StageCompetencyFormComponent implements OnInit {

  id = null;
  constructor(public service:StageCompetencyService, private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      this.id = this.route.snapshot.paramMap.get('id2');
    }

  ngOnInit(){
    this.service.refreshCompetencyList();
   // this.service.refreshStageList();
    this.resetForm();
  }
  
  resetForm(form?:NgForm) {
    if(form!=null)
      form.resetForm();
    this.service.formData = {
      StageCompetencyId: 0,
      Amount: 0,
      CompetencyId: 0,
      ProjectStageId: this.id
    }
  }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.StageCompetencyId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form:NgForm)
  {
    this.service.postStageCompetency(form.value).subscribe(
      res => {
        this.resetForm(form),
        this.toastr.success('Išsaugota sėkmingai');
        this.service.refreshList(this.id);
      },
      err => {
        console.log(err);
        this.toastr.error('Įvyko klaida');
      }
    )
  }

  updateRecord(form:NgForm)
  {
    this.service.putStageCompetency(form.value).subscribe(
      res => {
        this.resetForm(form),
        this.toastr.info('Išsaugota sėkmingai');
        this.service.refreshList(this.id);
      },
      err => {
        console.log(err);
        this.toastr.error('Įvyko klaida');
      }
    )
  }
}
