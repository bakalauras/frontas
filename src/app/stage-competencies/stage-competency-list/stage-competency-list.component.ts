import { Component, OnInit } from '@angular/core';
import { StageCompetencyService } from '../shared/stage-competency.service';
import { ToastrService } from 'ngx-toastr';
import { StageCompetency } from '../shared/stage-competency.model';
import { Router, ActivatedRoute } from '@angular/router';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-stage-competency-list',
  templateUrl: './stage-competency-list.component.html',
  styles: []
})
export class StageCompetencyListComponent extends KendoGridComponent implements OnInit {

  id = null;
  constructor(public service:StageCompetencyService, private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      super();
      this.id = this.route.snapshot.paramMap.get('id'); //get id parameter
    }


  ngOnInit(){
    this.service.refreshCompetencyList();
    this.service.refreshList(this.id, this.loadItems.bind(this));
    this.resetForm();
  }

  populateForm(pd:StageCompetency){
    this.service.formData = Object.assign({}, pd);
    this.opened2 = true;
  }

  onDelete(){
    this.opened = false;
    if(this.idToDelete!=0){
      this.service.deleteStageCompetency(this.idToDelete)
      .subscribe(res =>{
        this.toastr.success('Įrašas sėkmingai ištrintas');
        this.service.refreshList(this.id, this.loadItems.bind(this));
      },
        err => {
          console.log(err);
          this.toastr.error(err.error);
        })
    }
  }

  resetForm(form?:NgForm) {
    if(form!=null)
      form.resetForm();
    this.service.formData = {
      StageCompetencyId: 0,
      Amount: 0,
      Competency: null,
      CompetencyId: 0,
      ProjectStage: null,
      ProjectStageId: this.id
    }
  }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.StageCompetencyId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
    this.close();
  }

  insertRecord(form:NgForm)
  {
    this.service.postStageCompetency().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.success('Įrašas sėkmingai pridėtas');
        this.service.refreshList(this.id, this.loadItems.bind(this));
      },
      err => {
        console.log(err);
        this.toastr.error(err.error);
      }
    )
  }

  updateRecord(form:NgForm)
  {
    this.service.putStageCompetency().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.success('Įrašas sėkmingai atnaujintas');
        this.service.refreshList(this.id, this.loadItems.bind(this));
      },
      err => {
        console.log(err);
        this.toastr.error(err.error);
      }
    )
  }
}
