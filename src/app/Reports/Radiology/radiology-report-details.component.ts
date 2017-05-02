import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { RadiologyReport, ReportsService } from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';

@Component({
    moduleId: module.id,
    selector: 'radiology-report-details',
    templateUrl: 'radiology-report-details.component.html'
})
export class RadiologyReportDetailsComponent implements OnInit {
    radiologyReport: RadiologyReport;

    constructor(private route: ActivatedRoute, private _ReportsService: ReportsService,
                private router: Router, private _Logger: LoggerService, private translate: TranslateService) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.GetRadiologies();
        });
    }

    GetRadiologies() {
        this.radiologyReport = new RadiologyReport();
        this._Logger.info(this._ReportsService.selectedRadiologyReport);
        if (this._ReportsService.selectedRadiologyReport) {
            this.radiologyReport = this._ReportsService.selectedRadiologyReport;
        }else {
            this.router.navigate(['RadiologyReports']);
        }
    }
}
