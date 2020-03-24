import { Component, OnInit } from '@angular/core';
import { TenderFileService } from '../shared/tender-file.service';
import { ToastrService } from 'ngx-toastr';
import { TenderFile } from '../shared/tender-file.model';

@Component({
  selector: 'app-tender-file-list',
  templateUrl: './tender-file-list.component.html',
  styles: []
})
export class TenderFileListComponent implements OnInit {

  constructor(public service : TenderFileService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshTenderList();
    this.service.refreshList();
    
  }

  populateForm(pd:TenderFile)
  {
    this.service.formData = Object.assign({},pd);
  }

  onDelete(TenderFileId)
  {
    if(confirm('Ar tikrai norite ištrinti šį įrašą?')){
    this.service.deleteRecord(TenderFileId)
    .subscribe(
      res => {
        this.toastr.info('Įrašas sėkmingai ištrintas');
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
