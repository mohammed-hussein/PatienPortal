import { Component, OnInit } from '@angular/core';

import {Diagnosis, MedicalFunctionsService} from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';

@Component({
    moduleId: module.id,
    selector: 'patient-diagnosis',
    templateUrl: 'diagnosis.component.html'
})
export class DiagnosisComponent implements OnInit {
    diagnosis: Diagnosis[];

    constructor(private _Appointment: MedicalFunctionsService, private _Logger: LoggerService) { }

    ngOnInit() {
        this.getDiagnosis();
    }

    getDiagnosis() {
        this._Appointment.getDiagnosis().then(data => this.diagnosis = data)
                                        .then(() => this._Logger.info(this.diagnosis))
                                        .catch(() => this._Logger.Error('Erro found'));
    }
}
