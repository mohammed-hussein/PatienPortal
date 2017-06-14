import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { AppConstant, AppointmentSurvey } from '../index';
import { LoggerService } from '../../SharedServices/index';

@Injectable()
export class PublicService {

    private PublicAppointmentsReviewServiceURL: string = AppConstant.APP_URL + 'api/PublicServices/Appointments/satisfaction/Reviewed/';
    private surveyAppointmentsServiceURL: string = AppConstant.APP_URL + 'api/PublicServices/Appointments/satisfaction/';

    constructor(private http: Http, private router: Router, private _Logger: LoggerService) {
    }

    getAppointmentReview(RandomNum: string): Promise<AppointmentSurvey> {
        return this.http.get(this.PublicAppointmentsReviewServiceURL + RandomNum)
            .toPromise()
            .then(data => data.json() as AppointmentSurvey)
            .catch(this._Logger.handleError);
    }

    addsurveyAppointement(RandomNum: string, survey: AppointmentSurvey) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        return this.http.post(this.surveyAppointmentsServiceURL + RandomNum, JSON.stringify(survey), { headers: headers })
            .toPromise()
            .then(response => response.json())
            .catch(this._Logger.handleError);
    }

}
