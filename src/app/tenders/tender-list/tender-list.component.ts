import { Component, OnInit } from '@angular/core';
import { TenderService } from '../shared/tender.service';
import { ToastrService } from 'ngx-toastr';
import { Tender } from '../shared/tender.model';

@Component({
  selector: 'app-tender-list',
  templateUrl: './tender-list.component.html',
  styles: []
})
export class TenderListComponent implements OnInit {

  constructor(public service : TenderService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshTenderStateList();
    this.service.refreshContestsList();
    this.service.refreshList();
  }

  populateForm(pd:Tender)
  {
    this.service.formData = Object.assign({},pd);
  }

  onDelete(TenderId)
  {
    if(confirm('Ar tikrai norite ištrinti šį įrašą?')){
    this.service.deleteRecord(TenderId)
    .subscribe(
      res => {
        this.toastr.info('Įrašas sėkmingai ištrintas');
        this.service.refreshTenderStateList();
        this.service.refreshContestsList();
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
