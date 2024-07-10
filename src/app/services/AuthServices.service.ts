import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../Models/Base/responseModel';
import { LoginDto } from '../Models/Auth/loginDto';
import { RegisterDto } from '../Models/Auth/RegisterDto';
import { LoginResponseDto } from '../Models/Auth/loginResponseDto';
import { jwtDecode } from "jwt-decode";
import { Route, Router } from '@angular/router';
import { UserDto } from '../Models/Base/UserDto';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

constructor(private http:HttpClient,private router:Router) { }


private apiUrl = 'https://localhost:7028/api/' 

getToken(): string | null {
  return localStorage.getItem('token');
}

getDecodedToken(): any {
  const token = this.getToken();
  if (token) {
    return jwtDecode(token);
  }
  return null;
}

getUserRole(): string | null {
  const decodedToken = this.getDecodedToken();
  if (decodedToken) {
    return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
  }
  return null;
}

getUserName(): string | null {
  const decodedToken = this.getDecodedToken();
  if (decodedToken) {
    return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || null;
  }
  return null;
}

getUserUri(): string | null {
  const decodedToken = this.getDecodedToken();
  if (decodedToken) {
    return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/uri'] || null; // Adjust based on the actual claim name in your token
  }
  return null;
}

hasRole(role: string): boolean {
  const userRole = this.getUserRole();
  return userRole === role;
}

LogOut(){
  localStorage.removeItem('token')
  this.router.navigate([''])

}


public addPermissions(userId: number, permissions: string[]): Observable<ResponseModel<any>> {
  return this.http.post<ResponseModel<any>>(`${this.apiUrl}Admin/${userId}/permission/add`, permissions);
}

public getUsers(): Observable<ResponseModel<UserDto>> {
  return this.http.get<ResponseModel<UserDto>>(`${this.apiUrl}App/GetUsers`);
}

public getPermissions(): Observable<ResponseModel<any[]>> {
  return this.http.get<ResponseModel<any[]>>(`${this.apiUrl}App/GetPermissions`);
}

public Register(user: RegisterDto): Observable<ResponseModel<RegisterDto>> {
  return this.http.post<ResponseModel<RegisterDto>>(this.apiUrl + 'Auth/Register', user);
}

public Login(model: LoginDto): Observable<ResponseModel<LoginResponseDto>> {
  return this.http.post<ResponseModel<LoginResponseDto>>(this.apiUrl + 'Auth/Login', model);
}
// public ResendOtp(model: LoginModel): Observable<ResponseModel<LoginModel>> {
//   return this.http.post<ResponseModel<LoginModel>>(this.apiUrl + 'Account/TwoFactorLogin', model);
// }



}
