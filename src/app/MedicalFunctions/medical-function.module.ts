import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../Shared/shared.module';
import { SharedComponentModule } from '../SharedComponents/shared-components.module';


import {
    AppointmentsContainerComponent, AppointemntsDetailsComponent, AppointmentsAllComponent,
    DiagnosisComponent, DiagnosisContainerComponent, DiagnosisListComponent, DiagnosisDetailsComponent,
    MedicationsComponent, MedicationsContainerComponent, MedicationsListComponent, MedicationsDetailsComponent,
    RadiologiesComponent, RadiologiesContainerComponent, RadiologiesListComponent, RadiologiesDetailsComponent,
    LabContainerComponent, LapProceduresListComponent, LabProcedureDetailsComponent,
    NoRecordsComponent, AppointementsSatisfactionComponent, AppointmentsSatisfactionPublicComponent
} from './index';
import { LabStatusPipe } from './Lab/lab-status.pipe';
import { MedicalFunctionRoutingModule } from './medical-function.routing';


@NgModule({
    imports: [SharedModule, ReactiveFormsModule, MedicalFunctionRoutingModule, SharedComponentModule],
    exports: [AppointmentsContainerComponent, AppointemntsDetailsComponent, AppointmentsAllComponent,
        MedicationsComponent, MedicationsContainerComponent, MedicationsListComponent, MedicationsDetailsComponent,
        DiagnosisComponent, DiagnosisContainerComponent, DiagnosisListComponent, DiagnosisDetailsComponent,
        RadiologiesComponent, RadiologiesContainerComponent, RadiologiesListComponent, RadiologiesDetailsComponent,
        LabContainerComponent, LapProceduresListComponent, LabProcedureDetailsComponent,
    ],
    declarations: [AppointmentsContainerComponent, AppointemntsDetailsComponent, AppointmentsAllComponent,
        MedicationsComponent, MedicationsContainerComponent, MedicationsListComponent, MedicationsDetailsComponent,
        DiagnosisComponent, DiagnosisContainerComponent, DiagnosisListComponent, DiagnosisDetailsComponent,
        RadiologiesComponent, RadiologiesContainerComponent, RadiologiesListComponent, RadiologiesDetailsComponent,
        LabContainerComponent, LapProceduresListComponent, LabProcedureDetailsComponent,
        LabStatusPipe, NoRecordsComponent, AppointementsSatisfactionComponent, AppointmentsSatisfactionPublicComponent],
})

export class MedicalFunctionModule { }
