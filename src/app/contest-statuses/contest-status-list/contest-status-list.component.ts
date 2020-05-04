import { Component, OnInit } from '@angular/core';
import { ContestStatusService } from '../shared/contest-status.service';
import { ToastrService } from 'ngx-toastr';
import { ContestStatus } from '../shared/contest-status.model';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contest-status-list',
  templateUrl: './contest-status-list.component.html',
  styles: []
})
export class ContestStatusListComponent extends KendoGridComponent implements OnInit {

  constructor(public service : ContestStatusService, private toastr: ToastrService) {
    super();
   }

  ngOnInit() {
    this.service.refreshList(this.loadItems.bind(this));
    this.resetForm();
  }

  populateForm(pd:ContestStatus)
  {
    this.service.formData = Object.assign({},pd);
    this.opened2 = true;
  }

  onDelete()
  {
    this.opened = false;
    if(this.idToDelete!=0){
      this.service.deleteStatus(this.idToDelete)
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
      ContestStatusId : 0,
      StatusName : ''
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.ContestStatusId ==0)
      this.insert(form);
    else
      this.update(form);
    this.close();
  }

  insert(form:NgForm)
  {
    this.service.postStatus().subscribe(
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
    this.service.putStatus().subscribe(
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
