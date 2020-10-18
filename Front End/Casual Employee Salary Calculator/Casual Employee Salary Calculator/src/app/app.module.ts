// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';


// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

import { EmployeesComponent } from './employees/employees.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { EditEmployeesComponent } from './edit-employees/edit-employees.component';
import { RolesProfileComponent } from './roles-profile/roles-profile.component';
import { TasksProfileComponent } from './tasks-profile/tasks-profile.component';
import { AssignTasksComponent } from './assign-tasks/assign-tasks.component';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    EmployeesComponent,
    EmployeeProfileComponent,
    EditEmployeesComponent,
    RolesProfileComponent,
    TasksProfileComponent,
    AssignTasksComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
      },
      {
        path: 'home',
        component: HomeComponent
      }
      ,
      {
        path: 'employees-profile',
        component: EmployeeProfileComponent  
      }
      ,
      {
        path: 'tasks-profile', 
        component: TasksProfileComponent  
      }
      ,
      {
        path: 'assign-tasks', 
        component: AssignTasksComponent  
      }
      ,
      {
        path: 'reports', 
        component: ReportsComponent  
      }
      ,
      {
        path: 'roles-profile',
        component: RolesProfileComponent  
      }
      ,
      {
        path: 'edit-employees',
        component: EditEmployeesComponent
      }
      ,
      {
        path: 'employees',
        component: EmployeesComponent
      }
      ,
      { path: '**',
        component: HomeComponent
      }
   ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
