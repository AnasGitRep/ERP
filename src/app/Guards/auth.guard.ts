import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServicesService } from '../services/AuthServices.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanDeactivate<unknown> {
  constructor(private authService: AuthServicesService, private router: Router){}

  canActivate(): boolean {
    return this.checkLogin();
  }

  canActivateChild(): boolean {
    return this.checkLogin();
  }

  canDeactivate(): boolean {
    return this.checkLogin();
  }

  canLoad(): boolean {
    return this.checkLogin();
  }

  private checkLogin(): boolean {
    if (this.authService.getToken()) {
      if(this.authService.hasRole('Admin')){
        this.router.navigate(['Admin/Layout'])
      }
      if(this.authService.hasRole('User')){
        this.router.navigate(['User/Layout'])
      }
      return false;
    }
    return true;
  }
  
}
