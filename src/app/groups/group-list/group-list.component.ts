import { Component, OnInit } from '@angular/core';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';
import { GroupService } from '../shared/group.service';
import { ToastrService } from 'ngx-toastr';
import { Group } from '../shared/group.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styles: []
})
export class GroupListComponent extends KendoGridComponent implements OnInit {

  constructor(public service:GroupService,private toastr: ToastrService) { 
    super();
  }

  ngOnInit() {
    this.service.refreshList(this.loadItems.bind(this));
    this.resetForm();
  }

  populateForm(pd:Group){
    this.service.formData = Object.assign({}, pd);
    this.opened2 = true;
  }

  onDelete(){
    this.opened = false;
    if(this.idToDelete!=0){
      this.service.deleteGroup(this.idToDelete)
      .subscribe(res =>{
        this.toastr.success('Įrašas sėkmingai ištrintas');
        this.service.refreshList(this.loadItems.bind(this));
      },
        err => {
          console.log(err);
          this.toastr.error(err.error);
        })
    }
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      GroupId: 0,
      Title: ''
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.GroupId ==0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
    this.close();
  }

  insertRecord(form:NgForm)
  {
    this.service.postGroup().subscribe(
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

  updateRecord(form:NgForm)
  {
    this.service.putGroup().subscribe(
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
