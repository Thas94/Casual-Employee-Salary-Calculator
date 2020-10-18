import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Employees} from '../shared/employees.model'
import { ServiceService } from '../Services/service.service';
import {CreateRoles} from '../shared/create-roles.model'
import {CreateTasks} from '../shared/create-tasks.model'
import {AssignTasks} from '../shared/assign-tasks.model'

@Component({
  selector: 'app-assign-tasks',
  templateUrl: './assign-tasks.component.html',
  styleUrls: ['./assign-tasks.component.css']
})
export class AssignTasksComponent implements OnInit {

  allRoles: CreateRoles;
  allEmployees: Employees;
  employees : any;
  employeeID : number;
  empDetails : any;
  roleID : number;
  empRole : any;
  body : any;
  todayDate : any;
  Alltasks : any;
  tasksToShow : any;
  tasks : any;
  taskID : number;
  taskHours: any;
  roleRate : any;
  assignTasks : AssignTasks;
  assignTasksFform : AssignTasks;
  allAssignedTasks : any;
  employeeTasks : any[];
  totalHours : number = 0;
  totalHoursWorked : number;
  AmountWorked : number;
  level1 : number = 0;
  level1Hours: number = 0;
  level1Amount: number = 0;
  level2 : any
  level2Hours: number = 0;
  level2Amount: number = 0;


  constructor(private toastr: ToastrService, private service: ServiceService) { }

  ngOnInit() {

    //Getting all created roles
    this.service.GetCreatedRoles().subscribe((data :any ) => {
      this.allRoles = data;
      console.log("roles",this.allRoles)
  });

  //Getting all created employees
    this.service.GetAllEmployess().subscribe((data :any ) => {
      this.allEmployees = data;
      this.employees = data;
      console.log("employees",this.allEmployees)
  }); 

  //Getting all created tasks
    this.service.GetCreatedTaks().subscribe((data :any ) => {
      this.Alltasks = data;
      console.log("tass",this.Alltasks)
  });

  //Getting all assigned tasks
  this.service.GetAssignedTaks().subscribe((data :any ) => {
    this.allAssignedTasks = data;
    console.log("allAssignedTasks",this.allAssignedTasks)

    //filter all assigned tasks by role IDs
    this.level1 = this.allAssignedTasks.filter(x => x.RoleID == 1).length
    this.level2 = this.allAssignedTasks.filter(x => x.RoleID == 2).length

    //Accumatilating hours and amounts due
    for(var i = 0;i < this.allAssignedTasks.length;i++){
      if(this.allAssignedTasks[i].RoleID == 1)
      {
        this.level1Hours += this.allAssignedTasks[i].HoursWorked; 
        this.level1Amount += this.allAssignedTasks[i].AmountWorked;
      }
      else{ 
        this.level2Hours += this.allAssignedTasks[i].HoursWorked; 
        this.level2Amount += this.allAssignedTasks[i].AmountWorked;
      }  
    }  
    console.log("level1length",this.level1)  
  });  
  }
  
  //Selected employee for editing
  selectEmployee(emp: Employees){  
    this.employeeID = emp.EmployeeID;
    this.empDetails = emp.FirstName;
    console.log("empID", this.employeeID) 
  }

  //Selected employee
  selectRole(role: CreateRoles){  
      this.empRole = role.RoleCategory 
      this.roleID= role.CreateRoleID
      this.roleRate = role.RoleRate
      console.log("roleID", this.roleID)   
 
    }

    //Filter tasks by role ID 
    showTasks(){
      this.tasksToShow = this.Alltasks.filter(x => x.RoleID == this.roleID)
      console.log("tasks per role", this.tasksToShow) 
    }

    //Selected task
    selectTask(tsk : CreateTasks){
      this.tasks = tsk.TaskDescription      
      this.taskID = tsk.CreateTaskID
      this.taskHours = tsk.TaskHours
      console.log("taskID", this.taskID)  
      
      //filter assigned tasks by employee id and task id
      for(var i = 0;i < this.allAssignedTasks.length;i++){
        if(this.allAssignedTasks[i].EmployeeID == this.employeeID && this.allAssignedTasks[i].TaskID == this.taskID){
          alert("Employee cannot be assigned the same task in a day");  
          window.location.reload(); 
        }
      }
    }

    AssignTasks() {  

      //filter assigned tasks by employee id
      this.employeeTasks = this.allAssignedTasks.filter(x => x.EmployeeID == this.employeeID)
      console.log("employeeTasks", this.employeeTasks)

      //getting hours assigned to an employee
      for(var i = 0;i < this.employeeTasks.length;i++){
        this.totalHours += this.employeeTasks[i].HoursWorked;
      }

      //Accumating total hours worked by an employee
      this.totalHoursWorked = this.totalHoursWorked + this.totalHours;
      console.log("Total Hours", this.totalHours)

      //Checking if hours workder are not greater than 12 in a day
      if(this.totalHours > 12){
        this.toastr.error("Cannot work more than 12 hours a day","Employee");
        window.location.reload();
      }
      else{
        // Multiplying role rate by task hours
      this.AmountWorked = this.roleRate * this.taskHours;

      // Getting Today's date
      this.todayDate = new Date();
      var dd = String(this.todayDate.getDate()).padStart(2, '0');
      var mm = String(this.todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = this.todayDate.getFullYear();
      this.todayDate = mm + '/' + dd + '/' + yyyy;
      console.log("date", this.todayDate)
      
      //Creating object to parse to the assign task service
      this.assignTasksFform = {
        AssignTaskID : 1,
            TaskID: this.taskID,
            EmployeeID: this.employeeID,
            RoleID : this.roleID,
            DateAssigned: this.todayDate,
            HoursWorked: this.taskHours,
            AmountWorked: this.AmountWorked
      }
      
      console.log("form",this.assignTasksFform) 

      //Assign task service
      this.service.AssignTasks(this.assignTasksFform)
      .subscribe((data: any) => {
        if (data.Succeeded === true) {
          this.toastr.error('Failed to add employee details'); 
        } else {
          this.toastr.success('Employee details added.');
          window.location.reload();
        }
      }); 
    }
    }
}
