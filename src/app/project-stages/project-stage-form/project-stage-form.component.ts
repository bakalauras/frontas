import { Component, OnInit } from '@angular/core';
import { ProjectStageService } from '../shared/project-stage.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-project-stage-form',
  templateUrl: './project-stage-form.component.html',
  styles: []
})
export class ProjectStageFormComponent implements OnInit {

  constructor(public service: ProjectStageService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshProjectStageNamesList();
    this.service.refreshProjectsList();
    this.resetForm();
    
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      ProjectStageId : 0,
      ProjectStageNameId : 0,
      StageBudget : 0,
      StartDate : null,
      EndDate : null,
      ScheduledStartDate : null,
      ScheduledEndDate : null,
      ProjectId : 0
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.ProjectStageId ==0)
      this.insert(form);
    else
      this.update(form);
  }

  insert(form:NgForm)
  {
    this.service.postRecord().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Įrašas sėkmingai pridėtas');
        this.service.refreshList();
      },
      err => {
        console.log(err)
        this.toastr.error('Įvyko klaida');
      }
    )
  }

  update(form:NgForm)
  {
    this.service.putRecord().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Įrašas sėkmingai atnaujintas');
        this.service.refreshList();
      },
      err => {
        console.log(err)
        this.toastr.error('Įvyko klaida');
      }
    )
  }

}
