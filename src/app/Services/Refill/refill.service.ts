import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {RefillRequest} from './request.model';
import {City} from './city.model';

import {AuthHttp} from '../Auth/authHttp.service';
import {AppConstant} from '../const.model';

import { LoggerService } from '../../SharedServices/index';

@Injectable()
export class RefillService {
    private RefillServiceURL: string = AppConstant.APP_URL + 'api/Refill';
    private headers = new Headers({'Content-Type': 'application/json'});

    public selectedRequest: RefillRequest;

    constructor(private _http: AuthHttp, private _Logger: LoggerService) {}

    getRequests(): Promise<RefillRequest[]> {
        return this._http.get(this.RefillServiceURL)
                    .toPromise()
                    .then(data => data.json() as RefillRequest[])
                    .catch(this._Logger.handleError);

    }

    getCities(): Promise<City[]> {
        return this._http.get(this.RefillServiceURL + '/Cities')
                    .toPromise()
                    .then(data => data.json() as City[])
                    .catch(this._Logger.handleError);
    }

    addRequest(refillRequest: RefillRequest): Promise<boolean> {
        return this._http.post(this.RefillServiceURL, JSON.stringify(refillRequest), {headers: this.headers})
                            .toPromise()
                            .then(response => response.json()
                                )
                            .catch(this._Logger.handleError);
    }

    // Handle errors
    // private handleError(error: any): Promise<any> {
    //     console.error('An error occurred', error); // for demo purposes only
    //     return Promise.reject(error.message || error);
    // }
}
