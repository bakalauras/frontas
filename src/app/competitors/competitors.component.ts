import { Component, OnInit } from '@angular/core';
import { KendoGridComponent } from '../kendo-grid/kendo-grid.component';
import { CompetitorService } from './shared/competitor.service';
import { NgForm } from '@angular/forms';
import { Competitor } from './shared/competitor.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-competitors',
  templateUrl: './competitors.component.html',
  styles: []
})
export class CompetitorsComponent extends KendoGridComponent implements OnInit {

  constructor(public service : CompetitorService, private toastr: ToastrService) { 
    super();
  }
  ngOnInit(): void {
    this.service.refreshList(this.loadItems.bind(this));
    this.resetForm();
  }

  populateForm(pd:Competitor)
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
        this.service.refreshList(this.loadItems.bind(this));
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
      CompetitorId : 0,
      Name : '',
      Adress : ''
    }
  }

  onSubmit(form:NgForm){
  if(this.service.formData.CompetitorId ==0)
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
        this.service.refreshList(this.loadItems.bind(this));
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
        this.service.refreshList(this.loadItems.bind(this));
      },
      err => {
        console.log(err)
        this.toastr.error(err.error);
      }
    )
  }
}