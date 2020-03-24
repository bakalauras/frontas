import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContestService } from '../shared/contest.service';
import { Contest } from '../shared/contest.model';

@Component({
  selector: 'app-contest-list',
  templateUrl: './contest-list.component.html',
  styles: []
})
export class ContestListComponent implements OnInit {

  constructor(public service : ContestService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshCustomerList();
    this.service.refreshContestStatusList();
    this.service.refreshList();
  }

  populateForm(pd:Contest)
  {
    this.service.formData = Object.assign({},pd);
  }

  onDelete(ContestId)
  {
    if(confirm('Ar tikrai norite ištrinti šį įrašą?')){
    this.service.deleteRecord(ContestId)
    .subscribe(
      res => {
        this.toastr.info('Įrašas sėkmingai ištrintas');
        this.service.refreshCustomerList();
        this.service.refreshContestStatusList();
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
