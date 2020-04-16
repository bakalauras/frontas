import { Component, OnInit } from '@angular/core';
import { CompetencyService } from '../shared/competency.service';
import { ToastrService } from 'ngx-toastr';
import { Competency } from '../shared/competency.model';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-competency-list',
  templateUrl: './competency-list.component.html',
  styles: []
})
export class CompetencyListComponent extends KendoGridComponent implements OnInit {

  constructor(public service:CompetencyService, private toastr: ToastrService) { 
    super();
  }

  ngOnInit(){
    this.service.refreshList(this.loadItems.bind(this));
    this.resetForm();
  }

  populateForm(pd:Competency){
    this.service.formData = Object.assign({}, pd);
    this.opened2 = true;
  }

  onDelete(){
    this.opened = false;
    if(this.idToDelete!=0){
      this.service.deleteCompetency(this.idToDelete)
      .subscribe(res =>{
        this.toastr.info('Ištrinta sėkmingai');
        this.service.refreshList(this.loadItems.bind(this));
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
      CompetencyId: 0,
      Title: ''
    }
  }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.CompetencyId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
    this.close();
  }

  insertRecord(form:NgForm)
  {
    this.service.postCompetency().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.success('Išsaugota sėkmingai');
        this.service.refreshList(this.loadItems.bind(this));
      },
      err => {
        console.log(err);
        this.toastr.error('Įvyko klaida');
      }
    )
  }

  updateRecord(form:NgForm)
  {
    this.service.putCompetency().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.info('Išsaugota sėkmingai');
        this.service.refreshList(this.loadItems.bind(this));
      },
      err => {
        console.log(err);
        this.toastr.error('Įvyko klaida');
      }
    )
  }

}
