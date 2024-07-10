import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { MatCardModule } from '@angular/material/card';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from 'src/app/material.module';
import { AdminRoutes, AdminRoutingModule } from './Admin.routing.module';
import { CreateUpdatePermissionComponent } from './Settings/CreateUpdatePermission/CreateUpdatePermission.component';
import { AppsettingsComponent } from './Settings/Appsettings/Appsettings.component';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppDashboardComponent,CreateUpdatePermissionComponent,AppsettingsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    AdminRoutingModule,
    NgApexchartsModule,
    RouterModule.forChild(AdminRoutes),
    TablerIconsModule.pick(TablerIcons),
  ],
  exports: [TablerIconsModule],
})
export class AdminModule {}
