import { Component, OnInit } from '@angular/core';
import { DutyService } from '../shared/duty.service';
import { Duty } from '../shared/duty.model';
import { ToastrService } from 'ngx-toastr';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-duty-list',
  templateUrl: './duty-list.component.html',
  styles: []
})
export class DutyListComponent extends KendoGridComponent implements OnInit {

  constructor(public service:DutyService, private toastr: ToastrService) { 
    super();
  }

  ngOnInit() {
    this.service.refreshList(this.loadItems.bind(this));
    this.resetForm();
  }

  populateForm(pd:Duty){
    this.service.formData = Object.assign({}, pd);
    this.opened2 = true;
  }

  onDelete(){
    this.opened = false;
    if(this.idToDelete!=0){
      this.service.deleteDuty(this.idToDelete)
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
      DutyId: 0,
      Title: ''
    }
  }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.DutyId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
    this.close();
  }

  insertRecord(form:NgForm)
  {
    this.service.postDuty().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.success('Išsaugota sėkmingai');
        this.service.refreshList(this.loadItems.bind(this));
      },
      err => {
        console.log(err);
        //this.toastr.error(err.error.Title);//isspausdins angliskai
        this.toastr.error("Įvyko klaida.");
      }
    )
  }

  updateRecord(form:NgForm)
  {
    this.service.putDuty().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.success('Išsaugota sėkmingai');
        this.service.refreshList(this.loadItems.bind(this));
      },
      err => {
        console.log(err);
        this.toastr.error(err.error);
      }
    )
  }
}
