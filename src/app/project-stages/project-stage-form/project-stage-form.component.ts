import { Component, OnInit } from '@angular/core';
import { ProjectStageService } from '../shared/project-stage.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-stage-form',
  templateUrl: './project-stage-form.component.html',
  styles: []
})
export class ProjectStageFormComponent implements OnInit {

  id = null;
  id2 = null;
  public opened = false;
  constructor(public service: ProjectStageService,
    private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      this.id = this.route.snapshot.paramMap.get('id');
      this.id2 = this.route.snapshot.paramMap.get('id2'); //get id parameter
    }

  ngOnInit() {
    this.service.refreshProjectStageNamesList();
    this.service.refreshProjectsList();
    this.resetForm();
  }

  public close(status) {
    if(status =='yes')
    {
      this.delete(this.id2)
    }
    this.opened = false;
  }

  public open() {
    this.opened = true;
  }

  resetForm(form?: NgForm)
  {
    this.service.getRecord(this.id2);
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
      ProjectId : this.id
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.ProjectStageId ==0)
      this.insert(form);
    else
      this.update(form);
  }

  delete(ProjectStageId)
  {
      this.service.deleteRecord(ProjectStageId)
      .subscribe(
        res => {
          this.toastr.info('Įrašas sėkmingai ištrintas');
          this.router.navigateByUrl('/project/'+this.id);
        },
        err => {
          console.log(err)
          this.toastr.error(err.error);
        }
      )
   }

  insert(form:NgForm)
  {
    this.service.postRecord().subscribe(
      res => {
        this.toastr.success('Įrašas sėkmingai pridėtas');
        this.router.navigateByUrl('/project/'+this.id+'/stage/'+res.ProjectStageId);
        this.id2 = res.ProjectStageId;
        this.service.formData.ProjectStageId = res.ProjectStageId;
      },
      err => {
        console.log(err)
        this.toastr.error(err.error);
      }
    )
  }

  update(form:NgForm)
  {
    this.service.putRecord().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Įrašas sėkmingai atnaujintas');
      },
      err => {
        console.log(err)
        this.toastr.error(err.error);
      }
    )
  }

}
