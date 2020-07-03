import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContestStatusesComponent } from './contest-statuses/contest-statuses.component';
import { ProjectStageNamesComponent } from './project-stage-names/project-stage-names.component';
import { TenderStatesComponent } from './tender-states/tender-states.component';
import { CustomerTypesComponent } from './customer-types/customer-types.component';
import { EmployeeRolesComponent } from './employee-roles/employee-roles.component';
import { CustomersComponent } from './customers/customers.component';
import { ContestsComponent } from './contests/contests.component';
import { TendersComponent } from './tenders/tenders.component';
import { ProjectsComponent } from './projects/projects.component';
import { DutiesComponent } from './duties/duties.component';
import { CompetenciesComponent } from './competencies/competencies.component';
import { EmployeesComponent } from './employees/employees.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { ExamsComponent } from './exams/exams.component';
import { SalariesComponent } from './salaries/salaries.component';
import { EmployeeCertificatesComponent } from './employee-certificates/employee-certificates.component';
import { EmployeeExamsComponent } from './employee-exams/employee-exams.component';
import { EmployeeCompetenciesComponent } from './employee-competencies/employee-competencies.component';
import { EmployeeDutiesComponent } from './employee-duties/employee-duties.component';
import { ContestFormComponent } from './contests/contest-form/contest-form.component';
import { TenderFormComponent } from './tenders/tender-form/tender-form.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProjectStageFormComponent } from './project-stages/project-stage-form/project-stage-form.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { ChartsComponent } from './charts/charts.component';
import { StageCompetenciesComponent } from './stage-competencies/stage-competencies.component';
import { GroupsComponent } from './groups/groups.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { JwtService } from './jwt.service';
import { GroupRightsComponent } from './group-rights/group-rights.component';
import { HomeComponent } from './home/home.component';
import { DepartmentsComponent } from './departments/departments.component';
import { CertificateListComponent } from './certificates/certificate-list/certificate-list.component';
import { CertificatesListComponent } from './employee-certificates/certificates-list/certificates-list.component';

const routes: Routes = [
  {path: 'contestStatuses', component: ContestStatusesComponent, canActivate: [JwtService], data: {expectedRightPos: 0}},
  {path: 'projectStageNames', component: ProjectStageNamesComponent, canActivate: [JwtService], data: {expectedRightPos: 0}},
  {path: 'tenderStates', component: TenderStatesComponent, canActivate: [JwtService], data: {expectedRightPos: 0}},
  {path: 'customerTypes', component: CustomerTypesComponent, canActivate: [JwtService], data: {expectedRightPos: 0}},
  {path: 'employeeRoles', component: EmployeeRolesComponent, canActivate: [JwtService], data: {expectedRightPos: 0}},
  {path: 'customers', component : CustomersComponent, canActivate: [JwtService], data: {expectedRightPos: 2}},
  {path: 'contests', component : ContestsComponent, canActivate: [JwtService], data: {expectedRightPos: 1}},
  {path: 'tenders', component: TendersComponent, canActivate: [JwtService], data: {expectedRightPos: 5}},
  {path: 'projects', component: ProjectsComponent, canActivate: [JwtService], data: {expectedRightPos: 4}},
  {path: 'contest/:id', component : ContestFormComponent, canActivate: [JwtService], data: {expectedRightPos: 1}},
  {path: 'tender/:id', component : TenderFormComponent, canActivate: [JwtService], data: {expectedRightPos: 5}},
  {path: 'project/:id', component : ProjectFormComponent, canActivate: [JwtService], data: {expectedRightPos: 4}},
  {path: 'project/:id/stage/:id2', component : ProjectStageFormComponent, canActivate: [JwtService], data: {expectedRightPos: 4}},
  {path: 'duties', component : DutiesComponent, canActivate: [JwtService], data: {expectedRightPos: 0}},
  {path: 'competencies', component : CompetenciesComponent, canActivate: [JwtService], data: {expectedRightPos: 0}},
  {path: 'employees', component : EmployeesComponent, canActivate: [JwtService], data: {expectedRightPos: 3}},
  {path: 'certificates', component : CertificatesComponent, canActivate: [JwtService], data: {expectedRightPos: 0}},
  {path: 'exams', component : ExamsComponent, canActivate: [JwtService], data: {expectedRightPos: 0}},
  {path: 'salaries', component : SalariesComponent, canActivate: [JwtService], data: {expectedRightPos: 0}},
  {path: 'employee-certificate', component : EmployeeCertificatesComponent, canActivate: [JwtService], data: {expectedRightPos: 3}},
  {path: 'employee-exam', component : EmployeeExamsComponent, canActivate: [JwtService], data: {expectedRightPos: 3}},
  {path: 'employee-competency', component : EmployeeCompetenciesComponent, canActivate: [JwtService], data: {expectedRightPos: 3}},
  {path: 'stage-competency', component : StageCompetenciesComponent, canActivate: [JwtService], data: {expectedRightPos: 4}},
  {path: 'employee/:id', component : EmployeeComponent, canActivate: [JwtService], data: {expectedRightPos: 3}},
  {path: 'charts', component : ChartsComponent, canActivate: [JwtService], data: {expectedRightPos: 4}},
  {path: 'users', component : UsersComponent, canActivate: [JwtService], data: {expectedRightPos: 6}},
  {path: 'login', component : LoginComponent},
  {path: 'employee-duty', component : EmployeeDutiesComponent, canActivate: [JwtService], data: {expectedRightPos: 3}},
  {path: 'groupRights', component: GroupRightsComponent, canActivate: [JwtService], data: {expectedRightPos: 0}},
  {path: '', component: HomeComponent, canActivate: [JwtService], data: {expectedRightPos: -1}},
  {path: 'departments', component : DepartmentsComponent, canActivate: [JwtService], data: {expectedRightPos: 0}},
  {path: 'allCertificates', component : CertificatesListComponent, canActivate: [JwtService], data: {expectedRightPos: 0}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
