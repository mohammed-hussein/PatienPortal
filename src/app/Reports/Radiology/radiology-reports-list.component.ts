import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { RadiologyReport, ReportsService } from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';

@Component({
    moduleId: module.id,
    selector: 'radiology-reports-list',
    templateUrl: 'radiology-reports-list.component.html'
})
export class RadiologyReportsListComponent implements OnInit {
    RadiologyReports: RadiologyReport[];
    selectedRadiologyReport: RadiologyReport;
    showData: boolean = true;

    constructor(private _ReportsService: ReportsService, private _Logger: LoggerService,
        private router: Router, private route: ActivatedRoute, private translate: TranslateService) { }

    ngOnInit() {
        this.GetRadiologyReports();
    }

    GetRadiologyReports() {
        this._ReportsService.getRadioloyReports().then(data => {
            this.showData = true;
            this.RadiologyReports = data;
            this._Logger.info(this.RadiologyReports);
            this.onSelect(this.RadiologyReports[0]);
        }).catch(error => this.handleNoData(error));
    }

    onSelect(radiologyReport: RadiologyReport): void {
        this.selectedRadiologyReport = radiologyReport;
        this._ReportsService.selectedRadiologyReport = new RadiologyReport();
        this._ReportsService.selectedRadiologyReport = radiologyReport;
        if (radiologyReport) {
            this.router.navigate(['RadiologyReportDetails', Math.floor(Math.random() * 1000000)], { relativeTo: this.route });
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
