import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { Medication, MedicalFunctionsService } from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';

@Component({
    moduleId: module.id,
    selector: 'medication-details',
    templateUrl: 'medications-details.component.html'
})
export class MedicationsDetailsComponent implements OnInit {
    medication: Medication;

    constructor(private route: ActivatedRoute, private _Medication: MedicalFunctionsService,
                private router: Router, private _Logger: LoggerService, private translate: TranslateService) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.getMedications();
        });
    }

    getMedications() {
        this.medication = new Medication();
        this._Logger.info(this._Medication.selectedMedication);
        if (this._Medication.selectedMedication) {
            this.medication = this._Medication.selectedMedication;
        }else {
            this.router.navigate(['Medications']);
        }
    }
}
