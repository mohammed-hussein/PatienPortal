import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { Diagnosis, MedicalFunctionsService } from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';

@Component({
    moduleId: module.id,
    selector: 'diagnos-list',
    templateUrl: 'diagnosis-list.component.html'
})

export class DiagnosisListComponent implements OnInit {
    Diagnosis: Diagnosis[];
    selectedDiagnos: Diagnosis;
    showData: boolean = true ;

    constructor(private _MedicalService: MedicalFunctionsService, private _Logger: LoggerService,
                private router: Router, private route: ActivatedRoute, private translate: TranslateService) { }

    ngOnInit() {
        this.getDiagnosis();
    }

    getDiagnosis() {
        this._MedicalService.getDiagnosis().then(data => {
            this.showData = true;
            this.Diagnosis = data;
            this._Logger.info(this.Diagnosis);
            this.onSelect(this.Diagnosis[0]);
        }).catch(error => this.handleNoData(error));
    }

    onSelect(diagnos: Diagnosis): void {
        this.selectedDiagnos = diagnos;
        this._MedicalService.selectedDiagnos = new Diagnosis();
        this._MedicalService.selectedDiagnos = diagnos;
        if (diagnos) {
            this.router.navigate(['details', diagnos.DID], { relativeTo: this.route });
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
