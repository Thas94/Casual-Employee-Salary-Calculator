import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Employees} from '../shared/employees.model'
import { ServiceService } from '../Services/service.service';
import {AssignTasks} from '../shared/assign-tasks.model'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  allEmployees : any;
  body: Employees;
  allAssignedTasks : any;
  dateID : number;
  dateByID : any;
  FName: any;
  LastN : any;
  Gender: any;
  Title: any;
  Birthd: any;
  HiredD: any;
  Role: any;
  empCode: any;
  office: any;
  hd: any;
  dob : any;
  dateAssigned: any;
  amount: number = 0;
  hours: number = 0;
  assignDate: any;
  noTask : number = 0;   
  showInfo : any = false;

  constructor(private _router: Router,
    private toastr: ToastrService, private service: ServiceService) { }

  ngOnInit() {

        //getting all eemployees
        this.service.GetAllEmployess().subscribe((data :any ) => {
          this.allEmployees = data;
        });

        //Getting all assigned tasks
        this.service.GetAssignedTaks().subscribe((data :any ) => {
          this.allAssignedTasks = data;
          console.log("allAssignedTasks",this.allAssignedTasks)  
        });
  }

    //getting the selected employee details
    selectEmployee(emp: Employees){ 

      //Assigning labels values
      this.FName = emp.FirstName; 
      this.LastN= emp.LastName;
        this.Gender= emp.Gender;
        this.Title= emp.Title;
        this.hd= (emp.HireDate);
        this.dob=emp.BirthDate;
        this.Role=emp.Role;
        this.office= emp.Office;
        this.empCode = emp.EmployeeCode; 
        
        //Slicing the date
        this.Birthd = this.dob.slice(0,10);
        this.HiredD = this.hd.slice(0,10);

        //filter all tasks assigned by employee id
        this.dateByID = this.allAssignedTasks.filter(x => x.EmployeeID == emp.EmployeeID);
        console.log("info", this.dateByID) 
    }

    selectDate(date:AssignTasks){

      //Accumulating hours and amount by date assigned
      for(var i = 0;i < this.dateByID.length;i++){
        if(this.dateByID[i].DateAssigned == date.DateAssigned){ 
          this.hours += this.dateByID[i].HoursWorked; 
          this.amount += this.dateByID[i].AmountWorked; 
          this.noTask += 1;
        }
      } 

      //Assigning date to a label
      this.assignDate = date.DateAssigned;
      this.dateAssigned = this.assignDate.slice(0,10);

      //Show/hide employee details
      this.showInfo = true;
    }

}
