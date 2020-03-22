import { Component, OnInit } from '@angular/core';
import { ProjectStageNameService } from '../shared/project-stage-name.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-project-stage-name-form',
  templateUrl: './project-stage-name-form.component.html',
  styles: []
})
export class ProjectStageNameFormComponent implements OnInit {

  constructor(public service: ProjectStageNameService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      ProjctStageNameId : 0,
      StageName : ''
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.ProjctStageNameId ==0)
      this.insert(form);
    else
      this.update(form);
  }

  insert(form:NgForm)
  {
    this.service.postName().subscribe(
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
    this.service.putName().subscribe(
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
