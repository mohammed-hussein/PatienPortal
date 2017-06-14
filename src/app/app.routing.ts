import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent, ActivationCodeComponent, ProfileComponent, SessionTimeoutComponent } from './Auth/index';
import { AuthManagerService } from './Services/Auth/auth-manger.service';
import { AppointmentsSatisfactionPublicComponent } from './MedicalFunctions/index';

const routes: Routes = [
  { path: '', redirectTo: '/UserProfile', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'Activate', component: ActivationCodeComponent },
  { path: 'Sessiontimeout', component: SessionTimeoutComponent },
  { path: 'UserProfile', component: ProfileComponent, canActivate: [AuthManagerService] },
  {
    path: 'Public',
    children:
    [
      { path: 'AppointmentSatisfaction/:id', component: AppointmentsSatisfactionPublicComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
