import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AppointmentsContainerComponent, AppointemntsDetailsComponent,
  DiagnosisContainerComponent, DiagnosisDetailsComponent,
  MedicationsContainerComponent, MedicationsDetailsComponent,
  RadiologiesContainerComponent, RadiologiesDetailsComponent,
  LabContainerComponent, LabProcedureDetailsComponent,
  NoRecordsComponent, AppointementsSatisfactionComponent
} from './index';

import { AuthManagerService } from '../Services/Auth/auth-manger.service';

const Childsroutes: Routes = [
  {
    path: 'Appointments', component: AppointmentsContainerComponent, canActivate: [AuthManagerService],
    children:
    [
      { path: 'details/:id', component: AppointemntsDetailsComponent, canActivate: [AuthManagerService] },
      { path: 'nodata/:msg', component: NoRecordsComponent, canActivate: [AuthManagerService] },
    ]
  },
  {
    path: 'Appoint/:id', component: AppointmentsContainerComponent, canActivate: [AuthManagerService],
    children:
    [
      { path: 'survey/:id', component: AppointementsSatisfactionComponent, canActivate: [AuthManagerService] },
      { path: 'details/:id', component: AppointemntsDetailsComponent, canActivate: [AuthManagerService] },
      { path: 'nodata/:msg', component: NoRecordsComponent, canActivate: [AuthManagerService] },
    ]
  },
  {
    path: 'Medications', component: MedicationsContainerComponent, canActivate: [AuthManagerService],
    children:
    [
      { path: 'MedicationDetails/:id', component: MedicationsDetailsComponent, canActivate: [AuthManagerService] },
      { path: 'nodata/:msg', component: NoRecordsComponent, canActivate: [AuthManagerService] },
    ]
  },
  {
    path: 'Diagnosis', component: DiagnosisContainerComponent, canActivate: [AuthManagerService],
    children:
    [
      { path: 'details/:id', component: DiagnosisDetailsComponent, canActivate: [AuthManagerService] },
      { path: 'nodata/:msg', component: NoRecordsComponent, canActivate: [AuthManagerService] },
    ]
  },
  {
    path: 'Radiologies', component: RadiologiesContainerComponent, canActivate: [AuthManagerService],
    children:
    [
      { path: 'details/:id', component: RadiologiesDetailsComponent, canActivate: [AuthManagerService] },
      { path: 'nodata/:msg', component: NoRecordsComponent, canActivate: [AuthManagerService] },
    ]
  },
  {
    path: 'Labs', component: LabContainerComponent, canActivate: [AuthManagerService],
    children:
    [
      { path: 'details/:id', component: LabProcedureDetailsComponent, canActivate: [AuthManagerService] },
      { path: 'Lab/:id', component: LabProcedureDetailsComponent, canActivate: [AuthManagerService] },
      { path: 'nodata/:msg', component: NoRecordsComponent, canActivate: [AuthManagerService] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(Childsroutes)],
  exports: [RouterModule]
})

export class MedicalFunctionRoutingModule { }
