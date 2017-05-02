import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import { AuthHttp, AppConstant, PatientRecored } from '../index';
import { LoggerService } from '../../SharedServices/index';

@Injectable()
export class ProfileService {
    private ProfileServiceURL: string = AppConstant.APP_URL + 'api/Profile';
    // private AppointmentsServiceURL: string =  AppConstant.APP_URL + 'api/MedicalFunc/Appointments';
    // private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private _http: AuthHttp, private _Logger: LoggerService) { }

    getProfileData(): Promise<PatientRecored> {
        return this._http.get(this.ProfileServiceURL)
            .toPromise()
            .then(data => data.json() as PatientRecored)
            .catch(this._Logger.handleError);
    }

    // private handleError(error: any): Promise<any> {
    //     console.error('An error occurred', error); // for demo purposes only
    //     return Promise.reject(error.message || error);
    // }
}
