import { Component, OnInit } from '@angular/core';
import { ProjectStageNameService } from '../shared/project-stage-name.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectStageName } from '../shared/project-stage-name.model';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-project-stage-name-list',
  templateUrl: './project-stage-name-list.component.html',
  styles: []
})
export class ProjectStageNameListComponent  extends KendoGridComponent implements OnInit {

  constructor(public service : ProjectStageNameService, private toastr: ToastrService) {
    super(); 
  }

  ngOnInit() {
    this.service.refreshList(this.loadItems.bind(this));
    this.resetForm();
  }

  populateForm(pd:ProjectStageName)
  {
    this.service.formData = Object.assign({},pd);
    this.opened2 = true;
  }

  onDelete()
  {
    this.opened = false;
    if(this.idToDelete!=0)
    {
      this.service.deleteName(this.idToDelete)
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
      ProjctStageNameId : 0,
      StageName : ''
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.ProjctStageNameId ==0)
      this.insert(form);
    else
      this.update(form);
    this.close();
  }

  insert(form:NgForm)
  {
    this.service.postName().subscribe(
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
    this.service.putName().subscribe(
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
