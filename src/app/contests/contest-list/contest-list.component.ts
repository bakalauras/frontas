import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContestService } from '../shared/contest.service';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';

@Component({
  selector: 'app-contest-list',
  templateUrl: './contest-list.component.html',
  styles: []
})
export class ContestListComponent extends KendoGridComponent implements OnInit {

  constructor(public service : ContestService, private toastr: ToastrService) {
    super();
  }

  ngOnInit() {
    this.service.refreshCustomerList();
    this.service.refreshContestStatusList();
    this.service.refreshList(this.loadItems.bind(this));
  }
}
