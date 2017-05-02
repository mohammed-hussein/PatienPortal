import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AddRefillRequestComponent, RefillContainerComponent, RefillRequestsListComponent, RefillDetailsComponent} from './index';

import { AuthManagerService } from '../Services/Auth/auth-manger.service';

const Childsroutes: Routes = [
  {
path: 'RefillRequests', component: RefillContainerComponent, canActivate: [AuthManagerService],
    children:
    [
    { path: 'details/:id', component: RefillDetailsComponent, canActivate: [AuthManagerService] },
      // { path: 'add', component: AddRefillRequestComponent, canActivate: [AuthManagerService] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(Childsroutes)],
  exports: [RouterModule]
})

export class RefillRoutingModule { }
