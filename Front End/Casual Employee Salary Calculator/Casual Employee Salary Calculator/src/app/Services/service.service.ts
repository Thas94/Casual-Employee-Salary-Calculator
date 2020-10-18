import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Response, RequestMethod, RequestOptions, Headers, Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {Employees} from '../shared/employees.model'
import {CreateRoles} from '../shared/create-roles.model'
import {CreateTasks} from '../shared/create-tasks.model'
import {AssignTasks} from '../shared/assign-tasks.model'


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url = 'http://localhost:50813';

  constructor(private http: HttpClient, private http1: Http) {  
  }


Register(emp : Employees){ 

  //Converting the obect to json string
  var body = JSON.stringify(emp);
  //passing request header content type as application/json.
  var headerOptions = new Headers({'Content-Type' : 'application/json', 'Authorization':'Bearer'});
  //creates a request option object which we need to optionally pass
  var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions}); 
  //http.post() method that will return Observable<Response>. Using RxJS map() method we convert response data 
  //into JSON and finally we get Observable<Book> instance
  return this.http1.post(this.url +'/api/Employees',body,requestOptions).pipe(map(x => x.json())); 
}

UploadEmployeeImages(img : File){
  const endpoint = this.url + '/api/UploadImages';
  const formData : FormData = new FormData();
  formData.append('Image', img, img.name);
  return this.http1.post(endpoint, formData);
}

GetAllEmployess() {
  return this.http1.get(this.url + '/api/Employees')
  .map(res => res.json());
}

putEmployees(Id : any , emp : any){  

  var body = JSON.stringify(emp); 
  var headerOptions = new Headers({'Content-Type' : 'application/json'});
  var requestOptions = new RequestOptions({method : RequestMethod.Put,headers : headerOptions}); 
  return this.http1.put(this.url +'/api/Employees/' + Id,body,requestOptions).map(x => x.json());
   
}

DeleteEmployee(id) {
  console.log(id);
  //method that will return Observable<Response>. Using RxJS map() method we convert response data 
  //into JSON and finally we get Observable<Book> instance
  return this.http1.delete(this.url + '/api/Employees/'+id).map(res => res.json());
}

CreateRoles(role : CreateRoles)
{
  //Converting the obect to json string
  var body = JSON.stringify(role);
  //passing request header content type as application/json.
  var headerOptions = new Headers({'Content-Type' : 'application/json', 'Authorization':'Bearer'});
  //creates a request option object which we need to optionally pass
  var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions}); 
  //http.post() method that will return Observable<Response>. Using RxJS map() method we convert response data 
  //into JSON and finally we get Observable<Book> instance
  return this.http1.post(this.url +'/api/CreateRoles',body,requestOptions).pipe(map(x => x.json()));
}

GetCreatedRoles() {
  return this.http1.get(this.url + '/api/CreateRoles')
  .map(res => res.json());
}

EditRoles(Id : any , emp : any){  

  var body = JSON.stringify(emp); 
  var headerOptions = new Headers({'Content-Type' : 'application/json'});
  var requestOptions = new RequestOptions({method : RequestMethod.Put,headers : headerOptions}); 
  return this.http1.put(this.url +'/api/CreateRoles/' + Id,body,requestOptions).map(x => x.json());  
}

DeleteRole(id) {
  console.log(id);
    //method that will return Observable<Response>. Using RxJS map() method we convert response data 
  //into JSON and finally we get Observable<Book> instance
  return this.http1.delete(this.url + '/api/CreateRoles/'+id).map(res => res.json());
}

CreateTasks(tasks : CreateTasks){ 
  var body = JSON.stringify(tasks);
  var headerOptions = new Headers({'Content-Type' : 'application/json', 'Authorization':'Bearer'});
  var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions}); 
  return this.http1.post(this.url +'/api/CreateTasks',body,requestOptions).pipe(map(x => x.json())); 
}

GetCreatedTaks() {
  return this.http1.get(this.url + '/api/CreateTasks') 
  .map(res => res.json());
}

EditTasks(Id : any , emp : any){  
  var body = JSON.stringify(emp); 
  var headerOptions = new Headers({'Content-Type' : 'application/json'});
  var requestOptions = new RequestOptions({method : RequestMethod.Put,headers : headerOptions}); 
  return this.http1.put(this.url +'/api/CreateTasks/' + Id,body,requestOptions).map(x => x.json());  
}

DeleteTasks(id) {
  console.log(id);
  return this.http1.delete(this.url + '/api/CreateTasks/'+id).map(res => res.json());
}

AssignTasks(tasks : AssignTasks){ 
  var body = JSON.stringify(tasks);
  var headerOptions = new Headers({'Content-Type' : 'application/json', 'Authorization':'Bearer'});
  var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions}); 
  return this.http1.post(this.url +'/api/AssignTasks',body,requestOptions).pipe(map(x => x.json())); 
}

GetAssignedTaks() {
  return this.http1.get(this.url + '/api/AssignTasks') 
  .map(res => res.json());
}

}

