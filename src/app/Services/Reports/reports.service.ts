import { Injectable } from '@angular/core';

import { AppConstant, AuthHttp, Report, RadiologyReport } from '../index';
import { LoggerService } from '../../SharedServices/index';

@Injectable()
export class ReportsService {

    private ReportsServiceURL: string = AppConstant.APP_URL + 'api/Reports/';
    private ReportDetailsServiceURL: string = AppConstant.APP_URL + 'api/ReportDetails';
    private RadilogyReportsDetailsServiceURL: string = AppConstant.APP_URL + 'api/RadiologyReports';

    public selectedRadiologyReport: RadiologyReport;

    constructor(private _http: AuthHttp, private _Logger: LoggerService) { }

    getReportsSummary(RType: string): Promise<Report[]> {
        return this._http.get(this.ReportsServiceURL + RType)
            .toPromise()
            .then(data => data.json() as Report[])
            .catch(this._Logger.handleError);

    }

    getReportDetails(ReportID: string): Promise<string> {
        return this._http.get(this.ReportDetailsServiceURL + '?ReportId=' + ReportID)
            .toPromise()
            .then(data => data.json() as string)
            .catch(this._Logger.handleError);

    }

    getRadioloyReports(): Promise<RadiologyReport[]> {
        return this._http.get(this.RadilogyReportsDetailsServiceURL)
            .toPromise()
            .then(data => data.json() as RadiologyReport[])
            .catch(this._Logger.handleError);
    }
}
