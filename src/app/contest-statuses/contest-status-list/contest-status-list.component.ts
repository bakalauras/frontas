import { Component, OnInit } from '@angular/core';
import { ContestStatusService } from '../shared/contest-status.service';
import { ToastrService } from 'ngx-toastr';
import { ContestStatus } from '../shared/contest-status.model';

@Component({
  selector: 'app-contest-status-list',
  templateUrl: './contest-status-list.component.html',
  styles: []
})
export class ContestStatusListComponent implements OnInit {

  constructor(public service : ContestStatusService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(pd:ContestStatus)
  {
    this.service.formData = Object.assign({},pd);
  }

  onDelete(ContestStatusId)
  {
    if(confirm('Ar tikrai norite ištrinti šį įrašą?')){
    this.service.deleteStatus(ContestStatusId)
    .subscribe(
      res => {
        this.toastr.info('Įrašas sėkmingai ištrintas');
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
