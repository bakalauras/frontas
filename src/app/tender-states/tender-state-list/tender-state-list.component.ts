import { Component, OnInit } from '@angular/core';
import { TenderStateService } from '../shared/tender-state.service';
import { ToastrService } from 'ngx-toastr';
import { TenderState } from '../shared/tender-state.model';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tender-state-list',
  templateUrl: './tender-state-list.component.html',
  styles: []
})
export class TenderStateListComponent extends KendoGridComponent implements OnInit {

  constructor(public service : TenderStateService, private toastr: ToastrService) { 
    super();
  }

  ngOnInit() {
    this.service.refreshList(this.loadItems.bind(this));
    this.resetForm();
  }

  populateForm(pd:TenderState)
  {
    this.service.formData = Object.assign({},pd);
    this.opened2 = true;
  }

  onDelete()
  {
    this.opened = false;
    if(this.idToDelete!=0) {
      this.service.deleteRecord(this.idToDelete)
    .subscribe(
      res => {
        this.toastr.info('Įrašas sėkmingai ištrintas');
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
      TenderStateId : 0,
      Name : ''
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.TenderStateId ==0)
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
