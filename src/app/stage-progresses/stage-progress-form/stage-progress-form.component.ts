import { Component, OnInit } from '@angular/core';
import { StageProgressService } from '../shared/stage-progress.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stage-progress-form',
  templateUrl: './stage-progress-form.component.html',
  styles: []
})
export class StageProgressFormComponent implements OnInit {

  id2 = null;
  constructor(public service: StageProgressService,
    private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      this.id2 = this.route.snapshot.paramMap.get('id2');
    }

  ngOnInit() {
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
      ProjectStageId : this.id2
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
        this.service.refreshList(this.id2);
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
        this.service.refreshList(this.id2);
      },
      err => {
        console.log(err)
        this.toastr.error('Įvyko klaida');
      }
    )
  }

}
