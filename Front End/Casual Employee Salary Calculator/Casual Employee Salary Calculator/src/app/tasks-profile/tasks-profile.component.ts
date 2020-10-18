import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import {Employees} from '../shared/employees.model'
import {CreateRoles} from '../shared/create-roles.model'
import {CreateTasks} from '../shared/create-tasks.model'
import { ServiceService } from '../Services/service.service'; 

@Component({
  selector: 'app-tasks-profile',
  templateUrl: './tasks-profile.component.html',
  styleUrls: ['./tasks-profile.component.css']
})
export class TasksProfileComponent implements OnInit {

  tasks : CreateTasks;
  Alltasks : CreateTasks;
  body : CreateTasks;
  form : CreateTasks;
  allRoles: CreateRoles;
  roles: any[];
  RoleCategory : string;
  roleID : any;
  taskForm : CreateTasks;
  task : CreateTasks;

  constructor(private _router: Router,
    private toastr: ToastrService, private service: ServiceService) { }

  ngOnInit() {
    this.tasks = new CreateTasks();
    
    this.resetForm();
    this.service.GetCreatedTaks().subscribe((data :any ) => {
      this.Alltasks = data;
      console.log("tass",this.Alltasks)
  });
    this.service.GetCreatedRoles().subscribe((data :any ) => {
      this.allRoles = data;
      this.roles = data;
      console.log("roles",this.allRoles)
  });
  }

  resetForm(form?: NgForm) { 
    if (form != null) {
      form.reset();
        this.tasks = {
          TaskDescription: '',
          TaskHours: null,
          CreateTaskID : null,
          RoleID: null
        }
     }
  }

  getRoleID(role: CreateRoles){
    this.roleID = role.CreateRoleID
    console.log("id", this.roleID)
  }

  CreateTask(form:NgForm) {

    this.task = {
      CreateTaskID : this.tasks.CreateTaskID,
      RoleID : this.roleID,
      TaskDescription: form.value.TaskDescription,
      TaskHours: form.value.TaskHours
    }
    
     console.log("id", this.roleID) 
     console.log("form", this.task) 
    this.service.CreateTasks(this.task) 
    .subscribe((data: any) => {
      alert("yesss")
      if (data.Succeeded === true) {
        this.toastr.error('Failed to add employee details');
      } else {
        this.toastr.success('Employee details added.');
        this.resetForm(form);
        //document.getElementById("RoleCategory").innerHTML = ""; 
        window.location.reload();
        
      }
    });
  } 

  selectTask(emp: CreateTasks){ 
    this.body = { 
      TaskDescription: emp.TaskDescription,
      TaskHours: emp.TaskHours,
      CreateTaskID: emp.CreateTaskID,
      RoleID: emp.RoleID
    }
    this.tasks = emp;   
  }

  EditTasks(form:NgForm){
    this.form = {
      CreateTaskID : this.body.CreateTaskID,
      TaskDescription : form.value.TaskDescription,
      TaskHours : form.value.TaskHours,
      RoleID : this.body.RoleID
    }
    console.log("form", this.form) 
    this.service.EditTasks(this.body.CreateTaskID, this.form) 
    .subscribe(data => {
      alert("Updated.")
      window.location.reload();  
    });
  }

  deleteTask(tasks:CreateTasks){
    this.service.DeleteTasks(tasks.CreateTaskID)
    .subscribe(x => {
      //console.log("xx",x) 
      this.toastr.success("Deleted Successfully","Role");
      window.location.reload();   
    }) 
  }

}
 