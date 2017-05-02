import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {ROIContainerComponent, ROIListComponent, ROIDetailsComponent} from './index';
import { AuthManagerService } from '../Services/Auth/auth-manger.service';

const Childsroutes: Routes = [
  {
    path: 'ROI', component: ROIContainerComponent, canActivate: [AuthManagerService],
    children:
    [
      { path: 'ROIDetails/:id', component: ROIDetailsComponent, canActivate: [AuthManagerService] },
      // { path: 'add', component: , canActivate: [AuthManagerService] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(Childsroutes)],
  exports: [RouterModule]
})

export class ROIRoutingModule { }
