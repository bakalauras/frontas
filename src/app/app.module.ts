import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { ContestStatusesComponent } from './contest-statuses/contest-statuses.component';
import { ContestStatusFormComponent } from './contest-statuses/contest-status-form/contest-status-form.component';
import { ContestStatusListComponent } from './contest-statuses/contest-status-list/contest-status-list.component';
import { FormsModule } from "@angular/forms";
import { ProjectStageNamesComponent } from './project-stage-names/project-stage-names.component';
import { ProjectStageNameFormComponent } from './project-stage-names/project-stage-name-form/project-stage-name-form.component';
import { ProjectStageNameListComponent } from './project-stage-names/project-stage-name-list/project-stage-name-list.component';
import { TenderStatesComponent } from './tender-states/tender-states.component';
import { TenderStateFormComponent } from './tender-states/tender-state-form/tender-state-form.component';
import { TenderStateListComponent } from './tender-states/tender-state-list/tender-state-list.component';
import { CustomerTypeFormComponent } from './customer-types/customer-type-form/customer-type-form.component';
import { CustomerTypeListComponent } from './customer-types/customer-type-list/customer-type-list.component';
import { CustomerTypesComponent } from './customer-types/customer-types.component';
import { EmployeeRolesComponent } from './employee-roles/employee-roles.component';
import { EmployeeRoleFormComponent } from './employee-roles/employee-role-form/employee-role-form.component';
import { EmployeeRoleListComponent } from './employee-roles/employee-role-list/employee-role-list.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ContestStatusesComponent,
    ContestStatusFormComponent,
    ContestStatusListComponent,
    ProjectStageNamesComponent,
    ProjectStageNameFormComponent,
    ProjectStageNameListComponent,
    TenderStatesComponent,
    TenderStateFormComponent,
    TenderStateListComponent,
    CustomerTypesComponent,
    CustomerTypeFormComponent,
    CustomerTypeListComponent,
    EmployeeRolesComponent,
    EmployeeRoleFormComponent,
    EmployeeRoleListComponent,
    CustomersComponent,
    CustomerFormComponent,
    CustomerListComponent
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
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
