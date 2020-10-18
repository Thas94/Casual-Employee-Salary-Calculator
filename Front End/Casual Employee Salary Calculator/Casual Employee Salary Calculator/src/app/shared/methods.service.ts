import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions,RequestMethod } from '@angular/http';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BidService {

  readonly url = environment.rootUrl;

  constructor(private toastr : ToastrService,private http : Http) { }

  getRoleID(obj : any, role: string){
    console.log("role", role)
    for(var i = 0;i < obj.length;i++)
    {
      if(obj[i]["RoleCategory"] != role)  
      {
        console.log("yess category", obj[i].RoleCategory)
      }
      else
      {
        console.log("noo category", obj[i].RoleCategory)
      }
    }
  }
}
