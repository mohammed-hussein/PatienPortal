import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ReportsService } from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';

@Component({
    moduleId: module.id,
    selector: 'report-details',
    templateUrl: 'reports-details.component.html'
})
export class ReportDetailsComponent implements OnInit {
    reportID: string;
    reportContent: string;

    constructor(private route: ActivatedRoute, private _ReportsService: ReportsService, private _Logger: LoggerService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.reportID = params['id'];
            this._Logger.debug(params['id']);
            this.reportID = encodeURIComponent(this.reportID);
            this._Logger.debug(this.reportID);
            this.getreportsDetails();
        });
    }

    getreportsDetails() {
        this._ReportsService.getReportDetails(this.reportID).then(data => this.reportContent = data)
            .then(() => this._Logger.debug(this.reportContent))
            .catch(err => this._Logger.Error(err));
    }
}
