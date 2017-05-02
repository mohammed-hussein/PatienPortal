import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { Diagnosis, MedicalFunctionsService } from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';

@Component({
    moduleId: module.id,
    selector: 'diagnos-details',
    templateUrl: 'diagnosis-details.component.html'
})
export class DiagnosisDetailsComponent implements OnInit {
    diagnosis: Diagnosis;

    constructor(private route: ActivatedRoute, private _Diagnosis: MedicalFunctionsService,
                private router: Router, private _Logger: LoggerService, private translate: TranslateService) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.getDiagnosis();
        });
    }

    getDiagnosis() {
        this.diagnosis = new Diagnosis();
        this._Logger.info(this._Diagnosis.selectedDiagnos);
        if (this._Diagnosis.selectedDiagnos) {
            this.diagnosis = this._Diagnosis.selectedDiagnos;
        }else {
            this.router.navigate(['Diagnosis']);
        }
    }
}
