import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseModel } from '../Models/Base/responseModel';
import { Observable } from 'rxjs';
import { RegisterDto } from '../Models/Auth/RegisterDto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

constructor(private http:HttpClient,private router:Router) { }
private apiUrl = 'https://localhost:7028/api/' 

public Register(employee:RegisterDto): Observable<ResponseModel<RegisterDto>> {
  return this.http.post<ResponseModel<RegisterDto>>(this.apiUrl + 'Admin/AddEmployee',employee);
}
}
