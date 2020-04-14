import { Component, OnInit } from '@angular/core';
import { TenderService } from '../shared/tender.service';
import { ToastrService } from 'ngx-toastr';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';

@Component({
  selector: 'app-tender-list',
  templateUrl: './tender-list.component.html',
  styles: []
})
export class TenderListComponent extends KendoGridComponent implements OnInit {

  constructor(public service : TenderService, public toastr: ToastrService) { 
    super();
  }

  ngOnInit() {
    this.service.refreshTenderStateList();
    this.service.refreshContestsList();
    this.service.refreshList(this.loadItems.bind(this));
  }
}
