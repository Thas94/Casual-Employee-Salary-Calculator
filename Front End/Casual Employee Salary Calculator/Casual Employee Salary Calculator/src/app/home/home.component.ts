import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../Services/service.service'; 


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  level1 : any;
  level2 : any;
  level1Length : number;
  level2Length : number
  allAssignedTasks : any;

  constructor(private _router: Router,
    private toastr: ToastrService, private service: ServiceService) { }

  ngOnInit() {

    //Getting all data from services
     this.service.GetAssignedTaks().subscribe((data :any ) => {
      this.allAssignedTasks = data;
      console.log("allAssignedTasks",this.allAssignedTasks)
      this.level1 = this.allAssignedTasks.filter(x => x.RoleID == 1)
      console.log("level1",this.level1)
      this.level1Length = this.level1.length
      this.level2 = this.allAssignedTasks.filter(x => x.RoleID == 2)
      console.log("level2",this.level2)
      this.level2Length = this.level2.length
    });  

  }
}

