import { Component, OnInit } from '@angular/core';
import { ContestCompetitorService } from './shared/contest-competitor.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { KendoGridComponent } from '../kendo-grid/kendo-grid.component';
import { ContestCompetitor } from './shared/contest-competitor.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contest-competitors',
  templateUrl: './contest-competitors.component.html',
  styles: []
})
export class ContestCompetitorsComponent extends KendoGridComponent implements OnInit {

  id = null;
  constructor(public service:ContestCompetitorService, private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      super();
      this.id = this.route.snapshot.paramMap.get('id'); //get id parameter
    }

  
  ngOnInit(){
    this.service.refreshList(this.id, this.loadItems.bind(this));
    this.service.refreshCompetitorsList();
    this.resetForm();
  }

  populateForm(pd:ContestCompetitor){
    this.service.formData = Object.assign({}, pd);
    this.opened2 = true;
  }

  onDelete(){
    this.opened = false;
    if(this.idToDelete!=0){
      this.service.deleteRecord(this.idToDelete)
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
      ContestCompetitorId: 0,
      Price: 0,
      Competitor: null,
      CompetitorId: 0,
      Contest:null,
      ContestId: this.id
    }
  }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.ContestCompetitorId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
    this.close();
  }

  insertRecord(form:NgForm)
  {
    this.service.postRecord().subscribe(
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
    this.service.putRecord().subscribe(
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
