import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import {HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { HttpClientModule } from "@angular/common/http";
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import { ContestStatusesComponent } from './contest-statuses/contest-statuses.component';
import { ContestStatusListComponent } from './contest-statuses/contest-status-list/contest-status-list.component';
import { FormsModule } from "@angular/forms";
import { ProjectStageNamesComponent } from './project-stage-names/project-stage-names.component';
import { ProjectStageNameListComponent } from './project-stage-names/project-stage-name-list/project-stage-name-list.component';
import { TenderStatesComponent } from './tender-states/tender-states.component';
import { TenderStateListComponent } from './tender-states/tender-state-list/tender-state-list.component';
import { CustomerTypeListComponent } from './customer-types/customer-type-list/customer-type-list.component';
import { CustomerTypesComponent } from './customer-types/customer-types.component';
import { EmployeeRolesComponent } from './employee-roles/employee-roles.component';
import { EmployeeRoleFormComponent } from './employee-roles/employee-role-form/employee-role-form.component';
import { EmployeeRoleListComponent } from './employee-roles/employee-role-list/employee-role-list.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { ContestsComponent } from './contests/contests.component';
import { ContestFormComponent } from './contests/contest-form/contest-form.component';
import { ContestListComponent } from './contests/contest-list/contest-list.component';
import { TendersComponent } from './tenders/tenders.component';
import { TenderFormComponent } from './tenders/tender-form/tender-form.component';
import { TenderListComponent } from './tenders/tender-list/tender-list.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ContestFilesComponent } from './contest-files/contest-files.component';
import { ContestFileListComponent } from './contest-files/contest-file-list/contest-file-list.component';
import { TenderFilesComponent } from './tender-files/tender-files.component';
import { TenderFileListComponent } from './tender-files/tender-file-list/tender-file-list.component';
import { ProjectStagesComponent } from './project-stages/project-stages.component';
import { ProjectStageFormComponent } from './project-stages/project-stage-form/project-stage-form.component';
import { ProjectStageListComponent } from './project-stages/project-stage-list/project-stage-list.component';
import { WorkingTimeRegistersComponent } from './working-time-registers/working-time-registers.component';
import { WorkingTimeRegisterListComponent } from './working-time-registers/working-time-register-list/working-time-register-list.component';
import { StageProgressesComponent } from './stage-progresses/stage-progresses.component';
import { StageProgressListComponent } from './stage-progresses/stage-progress-list/stage-progress-list.component';
import { ResourcePlansComponent } from './resource-plans/resource-plans.component';
import { ResourcePlanListComponent } from './resource-plans/resource-plan-list/resource-plan-list.component';
import { DutiesComponent } from './duties/duties.component';
import { DutyComponent } from './duties/duty/duty.component';
import { DutyListComponent } from './duties/duty-list/duty-list.component';
import { NavComponent } from './nav/nav.component';
import { DutyService } from './duties/shared/duty.service';
import { CompetenciesComponent } from './competencies/competencies.component';
import { CompetencyComponent } from './competencies/competency/competency.component';
import { CompetencyListComponent } from './competencies/competency-list/competency-list.component';
import { CompetencyService } from './competencies/shared/competency.service';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeService } from './employees/shared/employee.service';
import { CertificatesComponent } from './certificates/certificates.component';
import { CertificateComponent } from './certificates/certificate/certificate.component';
import { CertificateListComponent } from './certificates/certificate-list/certificate-list.component';
import { CertificateService } from './certificates/shared/certificate.service';
import { ExamsComponent } from './exams/exams.component';
import { ExamListComponent } from './exams/exam-list/exam-list.component';
import { ExamService } from './exams/shared/exam.service';
import { SalariesComponent } from './salaries/salaries.component';
import { SalaryListComponent } from './salaries/salary-list/salary-list.component';
import { SalaryService } from './salaries/shared/salary.service';
import { EmployeeDutiesComponent } from './employee-duties/employee-duties.component';
import { EmployeeDutyListComponent } from './employee-duties/employee-duty-list/employee-duty-list.component';
import { EmployeeExamsComponent } from './employee-exams/employee-exams.component';
import { EmployeeExamListComponent } from './employee-exams/employee-exam-list/employee-exam-list.component';
import { EmployeeCertificatesComponent } from './employee-certificates/employee-certificates.component';
import { EmployeeCertificateListComponent } from './employee-certificates/employee-certificate-list/employee-certificate-list.component';
import { EmployeeCompetenciesComponent } from './employee-competencies/employee-competencies.component';
import { EmployeeCompetencyListComponent } from './employee-competencies/employee-competency-list/employee-competency-list.component';
import { ContestCertificatesComponent } from './contest-certificates/contest-certificates.component';
import { ContestCertificateListComponent } from './contest-certificates/contest-certificate-list/contest-certificate-list.component';
import { StageCompetenciesComponent } from './stage-competencies/stage-competencies.component';
import { StageCompetencyListComponent } from './stage-competencies/stage-competency-list/stage-competency-list.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MAT_DATE_LOCALE} from '@angular/material';
import { UploadComponent } from './upload/upload.component';
import { GridModule, PDFModule, ExcelModule  } from '@progress/kendo-angular-grid';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { UploadModule } from '@progress/kendo-angular-upload';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { KendoGridComponent } from './kendo-grid/kendo-grid.component';
import { GanttModule, ResizeService, SortService, FilterService, SelectionService, ReorderService,
  EditService, DayMarkersService, ToolbarService } from '@syncfusion/ej2-angular-gantt';
import { ChartsComponent } from './charts/charts.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

import { GroupsComponent } from './groups/groups.component';
import { GroupListComponent } from './groups/group-list/group-list.component';
import { CpiMeasuresComponent } from './cpi-measures/cpi-measures.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
import { UsersComponent } from './users/users.component';
import { UserService } from './users/shared/user.service';
import { MyInterceptor } from './my-interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import { AuthErrorHandler } from './auth-error-handler';
import { GroupRightsComponent } from './group-rights/group-rights.component';
import { GroupRightsListComponent } from './group-rights/group-rights-list/group-rights-list.component';
import { HomeComponent } from './home/home.component';
import { CompetitorsComponent } from './competitors/competitors.component';
import { ContestCompetitorsComponent } from './contest-competitors/contest-competitors.component';
import { EmployeeProjectsComponent } from './employee-projects/employee-projects.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentComponent } from './departments/department/department.component';
import { CertificatesListComponent } from './employee-certificates/certificates-list/certificates-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ContestStatusesComponent,
    ContestStatusListComponent,
    ProjectStageNamesComponent,
    ProjectStageNameListComponent,
    TenderStatesComponent,
    TenderStateListComponent,
    CustomerTypesComponent,
    CustomerTypeListComponent,
    EmployeeRolesComponent,
    EmployeeRoleFormComponent,
    EmployeeRoleListComponent,
    CustomersComponent,
    CustomerListComponent,
    ContestsComponent,
    ContestFormComponent,
    ContestListComponent,
    TendersComponent,
    TenderFormComponent,
    TenderListComponent,
    ProjectsComponent,
    ProjectFormComponent,
    ProjectListComponent,
    ContestFilesComponent,
    ContestFileListComponent,
    TenderFilesComponent,
    TenderFileListComponent,
    ProjectStagesComponent,
    ProjectStageFormComponent,
    ProjectStageListComponent,
    WorkingTimeRegistersComponent,
    WorkingTimeRegisterListComponent,
    StageProgressesComponent,
    StageProgressListComponent,
    ResourcePlansComponent,
    ResourcePlanListComponent,
    DutiesComponent,
    DutyComponent,
    DutyListComponent,
    NavComponent,
    CompetenciesComponent,
    CompetencyComponent,
    CompetencyListComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    CertificatesComponent,
    CertificateComponent,
    CertificateListComponent,
    ExamsComponent,
    ExamListComponent,
    SalariesComponent,
    SalaryListComponent,
    EmployeeDutiesComponent,
    EmployeeDutyListComponent,
    EmployeeExamsComponent,
    EmployeeExamListComponent,
    EmployeeCertificatesComponent,
    EmployeeCertificateListComponent,
    EmployeeCompetenciesComponent,
    EmployeeCompetencyListComponent,
    ContestCertificatesComponent,
    ContestCertificateListComponent,
    StageCompetenciesComponent,
    StageCompetencyListComponent,
    UploadComponent,
    KendoGridComponent,
    ChartsComponent,
    GroupsComponent,
    GroupListComponent,
    CpiMeasuresComponent,
    UsersComponent,
    LoginComponent,
    GroupRightsComponent,
    GroupRightsListComponent,
    HomeComponent,
    CompetitorsComponent,
    ContestCompetitorsComponent,
    EmployeeProjectsComponent,
    DepartmentsComponent,
    DepartmentComponent,
    CertificatesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    LayoutModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatExpansionModule,
    GridModule,
    PDFModule,
    ExcelModule,
    DialogsModule,
    ButtonsModule,
    UploadModule,
    DropDownsModule,
    GanttModule,
    DateInputsModule,
    ChartsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return     localStorage.getItem('access_token');},
        whitelistedDomains: ['http://localhost:4200'],
        blacklistedRoutes: ['http://localhost:4200/auth/login']
      }
    })
  ],
  providers: [DutyService, CompetencyService, EmployeeService, CertificateService, ExamService, SalaryService, UserService,
    { provide: MAT_DATE_LOCALE, useValue: 'lt-LT' }, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: AuthErrorHandler
    },
    ResizeService, SortService, FilterService, SelectionService, ReorderService,
     EditService, DayMarkersService, ToolbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
