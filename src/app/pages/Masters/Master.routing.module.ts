import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductDetailComponent } from './Ecommerce/ProductDetail/ProductDetail.component';
import { HomeComponent } from './Ecommerce/Home/Home/Home.component';
import { FullComponent } from 'src/app/layouts/full/full.component';
import { AppDashboardComponent } from '../Admin/dashboard/dashboard.component';

export const MasterRoutes: Routes = [

  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        component:AppDashboardComponent,
        pathMatch: 'full',
      },
    ]
  },
  
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'productDetail',
      component: ProductDetailComponent,
    },
];

@NgModule({
  imports:[RouterModule.forChild(MasterRoutes)],
  exports:[RouterModule]
})
export class AdminRoutingModule{}
