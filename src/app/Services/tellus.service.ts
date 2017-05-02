import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {IFeedback} from './feedback.model';

import {AuthHttp} from './Auth/authHttp.service';
import {AppConstant} from './const.model';
import { LoggerService } from '../SharedServices/index';

@Injectable()
export class TellusService {

    private TellUsServiceURL: string = AppConstant.APP_URL + 'api/TellUs' ;
    private headers = new Headers({'Content-Type': 'application/json'});

    public selectedFeedback: IFeedback;
    public Feedback_Type: string;

    constructor(private _http: AuthHttp, private _Logger: LoggerService) { }

    getFeedbackItems(Status: string): Promise<IFeedback[]> {
        let params: URLSearchParams = new URLSearchParams();
        // params.set('MRN', MRN);
        params.set('Status', Status);

        return this._http.get(this.TellUsServiceURL, {search : params})
                    .toPromise()
                    .then(response => response.json() as IFeedback[])
                    .catch(this._Logger.handleError);
    };

    // Get Buildings
    getBuildings(): Promise<string[]>{
        return this._http.get(this.TellUsServiceURL + '/Buildings')
                            .toPromise()
                            .then(response => response.json() as string[])
                            .catch(this._Logger.handleError);
    }

    // get Floors
    getFloors(building: string): Promise<string[]> {
        return this._http.get(this.TellUsServiceURL + '/Floors/' + building)
                            .toPromise()
                            .then(response => response.json() as string[])
                            .catch(this._Logger.handleError);
    }

    // Add floor
    Add(feedback: IFeedback): Promise<boolean> {
            return this._http.post(this.TellUsServiceURL, JSON.stringify(feedback), {headers: this.headers})
                                .toPromise()
                                .then(res => res.ok, r => this._Logger.debug(r.ok))
                                .catch(this._Logger.handleError);
    }

    // Handle errors
    // private handleError(error: any): Promise<any> {
    //     console.error('An error occurred', error); // for demo purposes only
    //     return Promise.reject(error.message || error);
    // }

}

