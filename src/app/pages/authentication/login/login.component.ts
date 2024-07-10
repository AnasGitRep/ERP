import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginDto } from 'src/app/Models/Auth/loginDto';
import { AuthServicesService } from 'src/app/services/AuthServices.service';

import { Router } from '@angular/router';
import { LoginResponseDto } from 'src/app/Models/Auth/loginResponseDto';
import { NotificationServiceService } from 'src/app/services/NotificationService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class AppSideLoginComponent implements OnInit {
  loginModel:LoginDto
  LoginForm: FormGroup 
  isLoading:boolean
  passwordFieldType: string = 'password'; 

  

  constructor(private service :AuthServicesService,private formBuilder: FormBuilder,
    private route: Router,
    private notificationService: NotificationServiceService
  ) {}
  ngOnInit(): void {
    this.loginModel = new LoginDto();
    this.CrateRegisterForm()
  }
  CrateRegisterForm(): void {
    this.LoginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, [Validators.required]],
    });
  }


  
  get UserRegister() {
    return this.LoginForm.controls['UserLogin'] as FormGroup;
  }
  get GetUsername() {
    return this.LoginForm.controls['username'] as FormControl;
  }
  get GetPassword() {
    return this.LoginForm.controls['password'] as FormControl;
  }

  MapFormData():void{    
    this.loginModel.username=this.GetUsername.value,
    this.loginModel.password=this.GetPassword.value
  }

  
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  showSuccess(message:any): void {
    this.notificationService.showSuccess(message);
  }

  showError(message:any): void {
    this.notificationService.showError(message);
  }

  Login(){
    this.isLoading=true
    this.MapFormData()
    if(this.LoginForm.valid){
      this.service.Login(this.loginModel).subscribe(x=>{
        if(x.isOk==true){
          this.isLoading=false
          this.showSuccess(x.message)

          if(x.item.jwtToke!=null){
            localStorage.setItem("token",x.item.jwtToke)
          }
          if(this.service.hasRole('Admin')){
            this.route.navigate(['Admin/Layout'])
          }
          if(this.service.hasRole('User')){
            this.route.navigate(['User/Layout'])
          }
          
        }else{
          this.showError(x.message)
          this.isLoading=false
        }
      })
    }else{
      alert("fill required fields");
    }
 
  }
}
