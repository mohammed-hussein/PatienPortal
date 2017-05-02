import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { ReportsService, Report } from '../../Services/index';
import { LoggerService, LoadingService } from '../../SharedServices/index';

@Component({
    moduleId: module.id,
    selector: 'Reports-List',
    templateUrl: 'reports-list.component.html'
})
export class ReportsListComponent implements OnInit {
    reports: Report[];
    selectedReport: Report;
    reportType: string;
    reportHeader: string;
    reportHeaderKey: string;
    showData: boolean = true;

    constructor(private router: Router, private route: ActivatedRoute, private _ReportsService: ReportsService,
        private _Logger: LoggerService, private translate: TranslateService, private _LoadingService: LoadingService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.showData = true;
            this.reportType = params['id'];
            this._Logger.debug(params['id']);
            this.getReportsSummary();
            this.setReportHeader(+this.reportType);
        });
        this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.getTrans(this.reportHeaderKey);
        });
    }

    setReportHeader(id: number) {
        if (id === 1) {
            // this.reportHeader = 'Sick leave';
            // this.getTrans('Reports.LABELS.Report_Sick');
            this.reportHeaderKey = 'Reports.LABELS.Report_Sick';
        } else if (id === 2) {
            // this.reportHeader = 'Discharge Summery';
            this.reportHeaderKey = 'Reports.LABELS.Report_Discharge';
        } else {
            // this.reportHeader = 'Watcher leave';
            this.reportHeaderKey = 'Reports.LABELS.Report_Watcher';
        }
        this.getTrans(this.reportHeaderKey);
    }

    getTrans(reportType: string) {
        this.translate.get(reportType).subscribe((res: string) => {
            this.reportHeader = res;
        });
    }

    getReportsSummary() {
        this._ReportsService.getReportsSummary(this.reportType).then(data => {
            this.reports = data;
            this._Logger.info(this.reports);
            this.onSelect(this.reports[0]);
        }).catch(error => this.handleNoData(error));
    }

    onSelect(report: Report): void {
        this.selectedReport = report;
        if (report) {
            this.router.navigate(['ReportDetails', report.ReportId], { relativeTo: this.route });
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
