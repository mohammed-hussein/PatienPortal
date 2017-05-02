import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { Medication, MedicalFunctionsService } from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';

@Component({
    moduleId: module.id,
    selector: 'medic-list',
    templateUrl: 'medications-list.component.html'
})

export class MedicationsListComponent implements OnInit {
    medications: Medication[];
    selectedMedication: Medication;
    showData: boolean = true;

    constructor(private _MedicalService: MedicalFunctionsService, private _Logger: LoggerService,
        private router: Router, private route: ActivatedRoute, private translate: TranslateService) { }

    ngOnInit() {
        this.getMedications();
    }

    getMedications() {
        this._MedicalService.getMedications().then(data => {
            this.showData = true;
            this.medications = data;
            this._Logger.info(this.medications);
            this.onSelect(this.medications[0]);
        }).catch(error => this.handleNoData(error));
    }

    onSelect(medication: Medication): void {
        this.selectedMedication = medication;
        this._MedicalService.selectedMedication = new Medication();
        this._MedicalService.selectedMedication = medication;
        if (medication) {
            this.router.navigate(['MedicationDetails', Math.random()], { relativeTo: this.route });
        }
    }

    handleNoData(ERR: any) {
        if (ERR.status === 404) {
            this.showData = false;
            let error = JSON.parse(ERR._body);
            error = error['Message'];
            this.router.navigate(['nodata', error], { relativeTo: this.route });
        } else {
            this._Logger.Error(ERR);
        }
    }
}
