import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import {Employees} from '../shared/employees.model'

import { ServiceService } from '../Services/service.service'; 

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees : Employees;
  imageURL : string = "/assets/images/attnd.png"; 
  fileToUpload : File = null;

  constructor(private _router: Router,
    private toastr: ToastrService, private service: ServiceService) { }

  ngOnInit() {
    this.employees = new Employees();
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
        this.employees = {
          FirstName: '',
          LastName: null,
          Title: null,
          Gender: '',
          BirthDate: null,
          PictureID : null,
          HireDate : null,
          EmployeeCode : '',
          Office : '',
          Role: '',
          EmployeeID: null
        }
     }
  }

  registerStudent(form:NgForm) {   
    console.log(form.value) 
    this.service.Register(form.value)
    .subscribe((data: any) => {
      if (data.Succeeded === true) {
        this.toastr.error('Failed to add employee details');
      } else {
        this.toastr.success('Employee details added.');
        this.resetForm(form);
        //window.location.reload();
      }
    });
  }

  handleFileInput(file : FileList){
     
    this.fileToUpload = file.item(0);

    //show image preview https://www.youtube.com/watch?v=c61wr1ZsHzY
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageURL = event.target.result; 
    }
    reader.readAsDataURL(this.fileToUpload);  
  }

  UploadImages(Image){
    this.service.UploadEmployeeImages(this.fileToUpload).subscribe(
      data => {
        this.toastr.success('Employee picture added.');
        Image.value = null; 
      }
    );
  }

}
