import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { FeedbackComponent } from './TellUs/tellus.component';
// import { Allfeedbackcomponent } from './TellUs/allfeedback.component';
// import { RefillRequestsComponent } from './Refill/refill-requests.component';
// import { AddRefillRequestComponent } from './Refill/add-refillrequest.component';
// import { MedicalReportSummaryComponent } from './ROI/medical-reports-summary.component';
// import { ROIDetailsComponent } from './ROI/report-details.component';
// import { ReportsSummaryComponent, ReportDetailsComponent } from './Reports/index';
// import { LoginComponent } from './Auth/login.component';
// import { ActivationCodeComponent } from './Auth/activation-code.component';
// import { SessionTimeoutComponent } from './Auth/session-timeout.component';
// import { ProfileComponent } from './Auth/Profile/profile.component';

import {LoginComponent, ActivationCodeComponent, ProfileComponent, SessionTimeoutComponent} from './Auth/index';

// import {LapProceduresComponent} from './MedicalFunctions/index';



import { AuthManagerService } from './Services/Auth/auth-manger.service';

const routes: Routes = [
  { path: '', redirectTo: '/UserProfile', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'Activate', component: ActivationCodeComponent },
  { path: 'Sessiontimeout', component: SessionTimeoutComponent },
  { path: 'UserProfile', component: ProfileComponent, canActivate: [AuthManagerService] },

  // { path: 'addfeedback', component: FeedbackComponent, canActivate: [AuthManagerService] },
  // { path: 'allfeedbacks', component: Allfeedbackcomponent, canActivate: [AuthManagerService] },
  // { path: 'refillRequests', component: RefillRequestsComponent, canActivate: [AuthManagerService] },
  // { path: 'addRequest', component: AddRefillRequestComponent, canActivate: [AuthManagerService] },
  // { path: 'MedicalReports', component: MedicalReportSummaryComponent, canActivate: [AuthManagerService] },
  // { path: 'ROIDetails/:id', component: ROIDetailsComponent, canActivate: [AuthManagerService] },
  // { path: 'Appointments', component: AppointmentsContainerComponent, canActivate: [AuthManagerService]},
  // { path: 'Medications', component: MedicationsComponent, canActivate: [AuthManagerService] },
  // { path: 'Diagnosis', component: DiagnosisComponent, canActivate: [AuthManagerService] },
  // { path: 'Radiologies', component: RadiologiesComponent, canActivate: [AuthManagerService] },
  // { path: 'Lab', component: LapProceduresComponent, canActivate: [AuthManagerService] },
  // { path: 'Lab/:id', component: LapProceduresComponent, canActivate: [AuthManagerService] },
  // { path: 'Reports/:id', component: ReportsSummaryComponent, canActivate: [AuthManagerService] },
  // { path: 'ReportDetails/:id', component: ReportDetailsComponent, canActivate: [AuthManagerService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
