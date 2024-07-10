import { RouterModule, Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { FullComponent } from 'src/app/layouts/full/full.component';
import { CreateUpdatePermissionComponent } from './Settings/CreateUpdatePermission/CreateUpdatePermission.component';
import { AppComponent } from 'src/app/app.component';
import { AppsettingsComponent } from './Settings/Appsettings/Appsettings.component';


export const AdminRoutes: Routes = [
  // {
  //   path: '',
  //   component: FullComponent,
  // },

  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        component:AppDashboardComponent,
        pathMatch: 'full',
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('../ui-components/ui-components.module').then((m) => m.UicomponentsModule),
      },
      {
        path:'permissionSettings',
        component:CreateUpdatePermissionComponent
      },
      {
        path:'appSettings',
        component:AppsettingsComponent
      }
    ]
  },

 

  
];

@NgModule({
  imports:[RouterModule.forChild(AdminRoutes)],
  exports:[RouterModule]
})
export class AdminRoutingModule{}
