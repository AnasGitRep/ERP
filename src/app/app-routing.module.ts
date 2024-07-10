import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSideLoginComponent } from './pages/authentication/login/login.component';
import { PagenotFoundComponent } from './pages/PagenotFound/PagenotFound.component';
import { RegisterComponent } from './pages/authentication/register/register.component';


const routes: Routes = [

  {
    path:'',
    component:AppSideLoginComponent, 
  },
  {
    path: 'Admin/Layout',
    loadChildren: () =>
      import('./pages/Admin/Admin.module').then((m) => m.AdminModule),
  },

  {
    path:'register',
    component:RegisterComponent
  },

  {
    path:'**',
    component:PagenotFoundComponent
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
