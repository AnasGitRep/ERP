import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServicesService } from 'src/app/services/AuthServices.service';
import { Router } from '@angular/router';
import { RegisterDto } from 'src/app/Models/Auth/RegisterDto';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerModel: RegisterDto;
  RegisterForm: FormGroup;
  isLoading: boolean;

  constructor(private service: AuthServicesService, private formBuilder: FormBuilder, private route: Router) {}

  ngOnInit(): void {
    this.registerModel = new RegisterDto();
    this.CreateRegisterForm();
  }

  CreateRegisterForm(): void {
    this.RegisterForm = this.formBuilder.group({
      name: [null, [Validators.required,Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, Validators.required],
      phoneNumber: [null],
      
      imageUrl: [null]
    },{ validator: this.mustMatch('password', 'confirmPassword') });
  }

  get GetUserNme() {
    return this.RegisterForm.controls['name'] as FormControl;
  }

  get GetEmail() {
    return this.RegisterForm.controls['email'] as FormControl;
  }
  get GetPassword() {
    return this.RegisterForm.controls['password'] as FormControl;
  }
  get GetConfirmPassword() {
    return this.RegisterForm.controls['confirmPassword'] as FormControl;
  }
  get GetPhoneNumber() {
    return this.RegisterForm.controls['phoneNumber'] as FormControl;
  }
  get GetImageUrl() {
    return this.RegisterForm.controls['imageUrl'] as FormControl;
  }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.GetImageUrl.setValue(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }


  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  MapFormData(): void {
    this.registerModel.name = this.GetUserNme.value;
    this.registerModel.email = this.GetEmail.value;
    this.registerModel.password = this.GetPassword.value;
    this.registerModel.phoneNumber = this.GetPhoneNumber.value;
    this.registerModel.imageUrl = this.GetImageUrl.value;
  }

  Register() {
    this.isLoading = true;
    this.MapFormData();
    if (this.RegisterForm.valid && this.GetPassword.value === this.GetConfirmPassword.value) {
      this.service.Register(this.registerModel).subscribe(x => {
        this.isLoading = false;
        if (x.isOk) {
          alert(x.message);
          this.route.navigate(['/login']);
        }
      });
    } else {
      alert('Fill required fields and make sure passwords match');
      this.isLoading = false;
    }
  }
}
