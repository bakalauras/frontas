import { Component, OnInit } from '@angular/core';
import { StageProgressService } from '../shared/stage-progress.service';
import { ToastrService } from 'ngx-toastr';
import { StageProgress } from '../shared/stage-progress.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';

@Component({
  selector: 'app-stage-progress-list',
  templateUrl: './stage-progress-list.component.html',
  styles: []
})
export class StageProgressListComponent extends KendoGridComponent implements OnInit {

  id = null;
  constructor(public service : StageProgressService, private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      super();
      this.id = this.route.snapshot.paramMap.get('id2'); //get id parameter
    }

  ngOnInit() {
    this.service.refreshList(this.id, this.loadItems.bind(this));
    this.resetForm();
  }

  populateForm(pd:StageProgress)
  {
    this.service.formData = Object.assign({},pd);
    this.opened2 = true;
  }

  onDelete()
  {
    this.opened = false;
    if(this.idToDelete!=0){
    this.service.deleteRecord(this.idToDelete)
    .subscribe(
      res => {
        this.toastr.success('Įrašas sėkmingai ištrintas');
        this.service.refreshList(this.id, this.loadItems.bind(this));
      },
      err => {
        console.log(err)
        this.toastr.error(err.error);
      }
    )
    }
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      StageProgressId : 0,
      Date : null,
      Percentage : 0,
      ScheduledPercentage : 0,
      SPI : 0,
      ProjectStageId : this.id
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.StageProgressId ==0)
      this.insert(form);
    else
      this.update(form);
    this.close();
  }

  insert(form:NgForm)
  {
    this.service.postRecord().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Įrašas sėkmingai pridėtas');
        this.service.refreshList(this.id, this.loadItems.bind(this));
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
        this.service.refreshList(this.id, this.loadItems.bind(this));
      },
      err => {
        console.log(err)
        this.toastr.error(err.error);
      }
    )
  }

}
