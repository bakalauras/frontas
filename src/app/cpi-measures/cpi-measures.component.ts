import { Component, OnInit } from '@angular/core';
import { CpiMeasureService } from './shared/cpi-measure.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { KendoGridComponent } from '../kendo-grid/kendo-grid.component';
import { CpiMeasure } from './shared/cpi-measure.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cpi-measures',
  templateUrl: './cpi-measures.component.html',
  styles: []
})
export class CpiMeasuresComponent extends KendoGridComponent  implements OnInit {

  id = null;

  constructor(public service : CpiMeasureService, private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      super();
      this.id = this.route.snapshot.paramMap.get('id2'); //get id parameter
    }

  ngOnInit() {
    this.service.refreshList(this.id, this.loadItems.bind(this));
    this.resetForm();
    
  }

  populateForm(pd:CpiMeasure)
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
      CPIMeasureId : 0,
      Date : null,
      PlannedPrice : 0,
      ActualPrice : 0,
      CPI : 0,
      ProjectStageId : this.id
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.CPIMeasureId ==0)
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
        this.toastr.success('Rodiklis sėkmingai apskaičiuotas');
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
        this.toastr.success('Rodiklis perskaičiuotas');
        this.service.refreshList(this.id, this.loadItems.bind(this));
      },
      err => {
        console.log(err)
        this.toastr.error(err.error);
      }
    )
  }
}
