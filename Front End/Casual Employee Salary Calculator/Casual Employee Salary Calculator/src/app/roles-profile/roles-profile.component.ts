import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {CreateRoles} from '../shared/create-roles.model'
import { ServiceService } from '../Services/service.service'; 
;

@Component({
  selector: 'app-roles-profile',
  templateUrl: './roles-profile.component.html',
  styleUrls: ['./roles-profile.component.css']
})
export class RolesProfileComponent implements OnInit {

  roles : CreateRoles;
  Allroles : CreateRoles;
  body : CreateRoles;
  form : CreateRoles;
  createdRoles : any;

  constructor(private _router: Router,
    private toastr: ToastrService, private service: ServiceService) { }

  ngOnInit() {
    this.roles = new CreateRoles();
    this.resetForm();

    //Getting all created roles
    this.service.GetCreatedRoles().subscribe((data :any ) => {
      this.Allroles = data;
      this.createdRoles = data;
      console.log("roles",this.Allroles)
  });
  }

  //Reset create role form inputs
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
        this.roles = {
          RoleCategory: '',
          RoleRate: null, 
          CreateRoleID: null 
        }
     }
  }


  CreateRole(form:NgForm) {   
    console.log(form.value) 

    //service to create role
    this.service.CreateRoles(form.value)
    .subscribe((data: any) => {
      if (data.Succeeded === true) {
        this.toastr.error('Failed to add Role details');
      } else {
        this.toastr.success('Role details added.');
        this.resetForm(form);
        window.location.reload();
      }
    });
  } 

  //select role for editing
  selectRole(emp: CreateRoles){ 
    this.body = { 
      RoleCategory: emp.RoleCategory,
      RoleRate: emp.RoleRate,
      CreateRoleID: emp.CreateRoleID
    }
    this.roles = emp;
      
  }

  EditRole(form:NgForm){

    //object to parse in the edit role service
    this.form = {
      CreateRoleID : this.body.CreateRoleID,
      RoleRate : form.value.RoleRate,
      RoleCategory : form.value.RoleCategory
    }
    console.log("form", this.form)

    //edit role service  
    this.service.EditRoles(this.body.CreateRoleID, this.form) 
    .subscribe(data => {
      alert("Updated.")
      window.location.reload();  
    });
  }

  //delete role service
  deleteRole(role:CreateRoles){
    this.service.DeleteRole(role.CreateRoleID)
    .subscribe(x => {
      this.toastr.success("Deleted Successfully","Role");
      window.location.reload();   
    })
    for(var i = 0;i < this.createdRoles.length;i++){ 
      
    } 
  }




  }



