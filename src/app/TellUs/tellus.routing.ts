import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeedbackContainerComponent, FeedbackDetailsComponent, AddFeadbackComponent} from './index';

import { AuthManagerService } from '../Services/Auth/auth-manger.service';

const Childsroutes: Routes = [
  {
    path: 'Feedbacks', component: FeedbackContainerComponent, canActivate: [AuthManagerService],
    children:
    [
      { path: 'details/:id', component: FeedbackDetailsComponent, canActivate: [AuthManagerService] },
      { path: 'container', component: FeedbackDetailsComponent, canActivate: [AuthManagerService] },
      { path: 'add/:type', component: AddFeadbackComponent, canActivate: [AuthManagerService] },
    ]
  },
  { path: 'AddFeedback/:type', component: AddFeadbackComponent, canActivate: [AuthManagerService] },
];

@NgModule({
  imports: [RouterModule.forChild(Childsroutes)],
  exports: [RouterModule]
})

export class TellusRoutingModule { }
