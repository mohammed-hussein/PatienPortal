import {Component, OnInit} from '@angular/core';

import {Medication, MedicalFunctionsService} from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';

@Component({
    moduleId: module.id,
    selector: 'patient-medications',
    templateUrl: './medications.component.html'
})

export class MedicationsComponent implements OnInit {
    medications: Medication[];

    constructor(private _MedicalService: MedicalFunctionsService, private _Logger: LoggerService) { }

    ngOnInit() {
        this.getMedications();
    }

    getMedications() {
        this._MedicalService.getMedications().then(data => this.medications = data)
                                        .then(() => this._Logger.info(this.medications))
                                        .catch(() => this._Logger.Error('Erro found'));
    }
}
