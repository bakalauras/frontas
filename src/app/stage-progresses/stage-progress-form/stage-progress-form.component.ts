import { Component, OnInit } from '@angular/core';
import { StageProgressService } from '../shared/stage-progress.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-stage-progress-form',
  templateUrl: './stage-progress-form.component.html',
  styles: []
})
export class StageProgressFormComponent implements OnInit {

  constructor(public service: StageProgressService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshProjectStageList();
    this.resetForm();
    
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      StageProgressId : 0,
      DateFrom : null,
      DateTo : null,
      Percentage : 0,
      ProjectStageId : 0
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.StageProgressId ==0)
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
