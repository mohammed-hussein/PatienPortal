import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { LabProcedure, MedicalFunctionsService } from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';

@Component({
    moduleId: module.id,
    selector: 'labProcedure-details',
    templateUrl: 'lab-details.component.html'
})
export class LabProcedureDetailsComponent implements OnInit {
    labproc: LabProcedure;
    LabTestID: string;
    LabProcedures: LabProcedure[];
    showData: boolean = false;
    error: string;
    className: string= 'w3-text-red';

    constructor(private route: ActivatedRoute, private _LabService: MedicalFunctionsService,
                private router: Router, private _Logger: LoggerService, private translate: TranslateService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.LabTestID = params['id']; // (+) converts string 'id' to a number
            this.LabProcedures = new Array<LabProcedure>();
            this.showData = true;
            this.getLab();
        });
    }

    getLab() {
        this.labproc = new LabProcedure();
        if (this._LabService.selectedLab) {
            this.labproc = this._LabService.selectedLab;
            if (this.labproc.testtype === 'PanelTest') {
                this.getLabSubTest();
            }else {
                this.LabProcedures.push(this._LabService.selectedLab);
            }
        } else {
            this.router.navigate(['Labs']);
        }
    }

    getLabSubTest() {
        this._LabService.getLabSubTest(this.labproc.TestID).then(data => this.LabProcedures = data)
            .then(() => this._Logger.info(this.LabProcedures))
            .catch(error => this.handleNoData(error));
    }

    handleNoData(ERR: any) {
        if (ERR.status === 404) {
            this.showData = false;
            this.error = JSON.parse(ERR._body);
            this.error = this.error['Message'];
            // this.router.navigate(['nodata', this.error], { relativeTo: this.route });
        } else {
            this._Logger.Error(ERR);
        }
    }
}
