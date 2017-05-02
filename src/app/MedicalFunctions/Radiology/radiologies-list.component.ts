import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { Radiology, MedicalFunctionsService } from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';

@Component({
    moduleId: module.id,
    selector: 'radiolog-list',
    templateUrl: 'radiologies-list.component.html'
})
export class RadiologiesListComponent implements OnInit {
    Radiologies: Radiology[];
    selectedMRadiology: Radiology;
    showData: boolean = true;

    constructor(private RadiologyService: MedicalFunctionsService, private _Logger: LoggerService,
        private router: Router, private route: ActivatedRoute, private translate: TranslateService) { }

    ngOnInit() {
        this.GetRadiologies();
    }

    GetRadiologies() {
        this.RadiologyService.getRadiologies().then(data => {
            this.showData = true;
            this.Radiologies = data;
            this._Logger.info(this.Radiologies);
            this.onSelect(this.Radiologies[0]);
        }).catch(error => this.handleNoData(error));
    }

    onSelect(radiology: Radiology): void {
        this.selectedMRadiology = radiology;
        this.RadiologyService.selectedRadiology = new Radiology();
        this.RadiologyService.selectedRadiology = radiology;
        if (radiology) {
            this.router.navigate(['details', Math.random()], { relativeTo: this.route });
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
