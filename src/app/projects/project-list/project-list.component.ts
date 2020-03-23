import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { ToastrService } from 'ngx-toastr';
import { Project } from '../shared/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styles: []
})
export class ProjectListComponent implements OnInit {

  constructor(public service : ProjectService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshCustomerList();
    this.service.refreshTenderList();
    this.service.refreshList();
  }

  populateForm(pd:Project)
  {
    this.service.formData = Object.assign({},pd);
  }

  onDelete(ProjectId)
  {
    if(confirm('Ar tikrai norite ištrinti šį įrašą?')){
    this.service.deleteRecord(ProjectId)
    .subscribe(
      res => {
        this.toastr.info('Įrašas sėkmingai ištrintas');
        this.service.refreshCustomerList();
        this.service.refreshTenderList();
        this.service.refreshList();
      },
      err => {
        console.log(err)
        this.toastr.error('Įvyko klaida');
      }
    )
    }
  }

}
