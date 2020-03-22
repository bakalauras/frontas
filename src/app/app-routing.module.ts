import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContestStatusesComponent } from './contest-statuses/contest-statuses.component';
import { ProjectStageNamesComponent } from './project-stage-names/project-stage-names.component';
import { TenderStatesComponent } from './tender-states/tender-states.component';
import { CustomerTypesComponent } from './customer-types/customer-types.component';
import { EmployeeRolesComponent } from './employee-roles/employee-roles.component';
import { CustomersComponent } from './customers/customers.component';


const routes: Routes = [
  {path: 'contestStatuses', component: ContestStatusesComponent},
  {path: 'projectStageNames', component: ProjectStageNamesComponent},
  {path: 'tenderStates', component: TenderStatesComponent},
  {path: 'customerTypes', component: CustomerTypesComponent},
  {path: 'employeeRoles', component: EmployeeRolesComponent},
  {path: 'customers', component : CustomersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
