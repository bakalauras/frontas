import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employees/shared/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { SalaryService } from './shared/salary.service';
import { Salary } from './shared/salary.model';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: []
})
export class SalariesComponent implements OnInit {
  selectedOption:number;
  id = 0;

  constructor() { 
   // this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  }

}
