import { NgModule } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { MatCardModule } from '@angular/material/card';


import { MasterRoutes, AdminRoutingModule } from './Master.routing.module';
import { HomeComponent } from './Ecommerce/Home/Home/Home.component';
import { HeaderComponent } from 'src/app/layouts/full/header/header.component';
import { PagenotFoundComponent } from '../PagenotFound/PagenotFound.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [PagenotFoundComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
    AdminRoutingModule,
    NgApexchartsModule,
    RouterModule.forChild(MasterRoutes),
    TablerIconsModule.pick(TablerIcons),
  ],
  exports: [TablerIconsModule],
})
export class MasterModule {}
