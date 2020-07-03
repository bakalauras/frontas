import { Component, OnInit } from '@angular/core';
import { KendoGridComponent } from '../kendo-grid/kendo-grid.component';
import { EmployeeService } from '../employees/shared/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkingTimeRegister } from '../working-time-registers/shared/working-time-register.model';

@Component({
  selector: 'app-employee-projects',
  templateUrl: './employee-projects.component.html',
  styles: []
})
export class EmployeeProjectsComponent extends KendoGridComponent implements OnInit {
  id = null;
  list: WorkingTimeRegister[];

  constructor(public service: EmployeeService, private router: Router, public route: ActivatedRoute) { 
    super();
    this.id = this.route.snapshot.paramMap.get('id'); 
  }

  ngOnInit(){
    this.service.refreshProjectsList(this.id,this.loadItems.bind(this));
    this.service.getDataa(this.id).subscribe(data => {
      console.log(data);
      this.list = data;
    })
    
  }

}
