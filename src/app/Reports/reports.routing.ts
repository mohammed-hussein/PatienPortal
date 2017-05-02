import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ReportsContainerComponent, ReportDetailsComponent,
        RadiologyReportsContainerComponent, RadiologyReportDetailsComponent,
      } from './index';
import { AuthManagerService } from '../Services/Auth/auth-manger.service';

const Childsroutes: Routes = [
  {
    path: 'Reports/:id', component: ReportsContainerComponent, canActivate: [AuthManagerService],
    children:
    [
      { path: 'ReportDetails/:id', component: ReportDetailsComponent, canActivate: [AuthManagerService] },
    ]
  },
  {
    path: 'RadiologyReports', component: RadiologyReportsContainerComponent, canActivate: [AuthManagerService],
    children:
    [
      { path: 'RadiologyReportDetails/:id', component: RadiologyReportDetailsComponent, canActivate: [AuthManagerService] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(Childsroutes)],
  exports: [RouterModule]
})

export class ReportsRoutingModule { }
