import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Employees} from '../shared/employees.model'
import { ServiceService } from '../Services/service.service';

@Component({
  selector: 'app-edit-employees',
  templateUrl: './edit-employees.component.html',
  styleUrls: ['./edit-employees.component.css']
})
export class EditEmployeesComponent implements OnInit {

  allEmployees : any;
  body: Employees;
  employees : Employees;
  value : Employees;

  constructor(private _router: Router,
    private toastr: ToastrService, private service: ServiceService) { }

  ngOnInit() {
    this.employees = new Employees();

    //getting all eemployees
    this.service.GetAllEmployess().subscribe((data :any ) => {
      this.allEmployees = data;
  });
  }

  //getting the selected employee details
  selectEmployee(emp: Employees){ 
    this.body = {
      FirstName: emp.FirstName,
      LastName: emp.LastName,
      Gender: emp.Gender,
      Title: emp.Title,
      HireDate:emp.HireDate,
      BirthDate:emp.BirthDate,
      Role:emp.Role, 
      Office: emp.Office,
      PictureID: emp.PictureID,
      EmployeeCode: emp.EmployeeCode,
      EmployeeID: emp.EmployeeID
      
    }
    this.employees = emp;
      
  }

  //Editting employees
  editEmployee(form:NgForm)
  { 
    //creating object to parse to the register service
    this.value = {
      FirstName: form.value.FIRSTNAME,
      LastName: form.value.LASTNAME,
      Gender: form.value.GENDER,
      Title: form.value.TITLE,
      HireDate:form.value.HD,
      BirthDate:form.value.DOB,
      Role:form.value.role,
      Office: form.value.office,
      PictureID: form.value.picid,
      EmployeeCode: form.value.EmpCode,
      EmployeeID: this.body.EmployeeID
    }
    console.log("form value",this.value )
    this.toastr.success("Edited Successfully","Employee");
    //service to register employee
    this.service.putEmployees(this.body.EmployeeID, this.value) 
    .subscribe(data => {
      this.toastr.success("Edited Successfully","Employee");
      window.location.reload();  
    });
  }

  //deleting an employee
  deleteEmployees(emp: Employees){
    this.service.DeleteEmployee(emp.EmployeeID)
     .subscribe(x => {
       this.toastr.success("Deleted Successfully","Employee");
       window.location.reload();   
     })   
    }
  
}
