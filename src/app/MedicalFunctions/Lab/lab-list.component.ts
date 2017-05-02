import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { TranslateService } from '@ngx-translate/core';

import { LabProcedure, MedicalFunctionsService } from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';

@Component({
    moduleId: module.id,
    selector: 'lab-List',
    templateUrl: 'lab-list.component.html'
})
export class LapProceduresListComponent implements OnInit {
    labProcedure: LabProcedure[];
    testId: string;
    isSubTest: boolean = false;
    selectedLab: LabProcedure;
    showData: boolean = false;
    NoData: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router,
        private _LabService: MedicalFunctionsService, private _Logger: LoggerService, private translate: TranslateService) { }

    ngOnInit() {
        this.NoData = false;
        this.route.params.subscribe(params => {
            this.testId = params['id'];
            this._Logger.debug(params['id']);
            // if (this.testId === undefined) {
                this.getLabProcedures();
            // } else {
            //     this.isSubTest = true;
            //     this.getLabSubTest();
            // }
        });
    }

    getLabProcedures() {
        this._LabService.getLabProcedures()
            .then(data => {
                this.showData = true;
                this.labProcedure = data;
                this._Logger.info(this.labProcedure);
                this.onSelect(this.labProcedure[0]);
            })
            .catch(error => this.handleNoData(error));
    }

    // getLabSubTest() {
    //     this._LabService.getLabSubTest(this.testId).then(data => {
    //         this.showData = true;
    //         this.labProcedure = data;
    //         this._Logger.info(this.labProcedure);
    //     }).catch(error => this.handleNoData(error));
    // }

    onSelect(lab: LabProcedure): void {
        this.selectedLab = lab;
        this._LabService.selectedLab = new LabProcedure();
        this._LabService.selectedLab = lab;
        if (lab) {
            // this.router.navigate(['details', lab.TestID], { relativeTo: this.route });
            this.router.navigate(['details', Math.floor(Math.random() * 1000000)], { relativeTo: this.route });
        }
    }

    handleNoData(ERR: any) {
        if (ERR.status === 404) {
            this.NoData = true;
            let error = JSON.parse(ERR._body);
            error = error['Message'];
            this.router.navigate(['nodata', error], { relativeTo: this.route });
        } else {
            this._Logger.Error(ERR);
        }
    }
}
