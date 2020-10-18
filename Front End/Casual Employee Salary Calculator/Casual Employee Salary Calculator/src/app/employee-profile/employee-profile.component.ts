import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Employees} from '../shared/employees.model'
import { ServiceService } from '../Services/service.service'; 
import {CreateRoles} from '../shared/create-roles.model'


@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  employees : Employees;
  imageURL : string = "/assets/images/addphoto.jpg"; 
  fileToUpload : File = null;
  allRoles: CreateRoles;
  RoleCategory : string;
  form : Employees;
  showButton : any;
  gender: any[2];
  title: any[3];
  formGender : any;
  formTitle: any;

  constructor(private _router: Router,
    private toastr: ToastrService, private service: ServiceService) { }

  ngOnInit() {
    this.employees = new Employees();
    //reset registration form
    this.resetForm();

    //getting all created roles
    this.service.GetCreatedRoles().subscribe((data :any ) => {
      this.allRoles = data;
      console.log("roles",this.allRoles)
  });

  //arrays used for gender and roles inputs
  this.gender = [{Gender: "Male"},{Gender: "Female"}]
  this.title = [{Title: "Mr"},{Title: "Mrs"},{Title: "Ms"}]
  console.log("gender",this.gender) 
  }

  //function to reset the registration form
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

  //function to choose image
  handleFileInput(file : FileList){   
    this.fileToUpload = file.item(0);

    //show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageURL = event.target.result; 
    }
    reader.readAsDataURL(this.fileToUpload); 

    //show/hide registration button
    this.showButton = true;   
  }

  //function to register employess
  registerEmployees(form:NgForm) {

    //getting input values
    this.RoleCategory = ((document.getElementById("RoleCategory") as HTMLInputElement).value);
    this.formGender =((document.getElementById("Gender") as HTMLInputElement).value);
    this.formTitle = ((document.getElementById("Title") as HTMLInputElement).value);   

    //create an object to parse to the register service method
    this.form = {
      BirthDate : form.value.DOB  ,
      EmployeeCode: form.value.EmpCode,
      FirstName: form.value.FIRSTNAME,
      LastName: form.value.LASTNAME,
      HireDate: form.value.HD,
      Title: this.formTitle,
      Office: form.value.office,
      PictureID: form.value.PictureID,
      Role:this.RoleCategory,
      Gender: this.formGender,
      EmployeeID: form.value.empID

    }
    console.log(this.form) 

    //register employee service
    this.service.Register(this.form) 
    .subscribe((data: any) => {
      if (data.Succeeded === true) {
        this.toastr.error('Failed to add employee details');
      } else {
        this.toastr.success('Employee details added.');
        this.resetForm(form); 
        window.location.reload();
      }
    }); 

  //calling service to upload image
    this.service.UploadEmployeeImages(this.fileToUpload).subscribe(
      data => {
      }
    );
  }

  //service to upload image
  UploadImages(Image){
    this.service.UploadEmployeeImages(this.fileToUpload).subscribe(
      data => {
        //this.toastr.success('Employee picture added.');
        Image.value = null; 
      }
    );
  }

}
