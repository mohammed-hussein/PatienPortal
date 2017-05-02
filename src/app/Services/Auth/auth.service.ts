import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { LoggerService } from '../../SharedServices/index';

import { User } from './user.model';
import { AuthConfigConsts, AppConstant } from '../const.model';

// import { LoggerService} from '../../SharedServices/Logging/logger.service';
// import { SessionExpireService } from '../../SharedServices/Session/session-expire.service';
// import {  SessionHandlerService  } from '../../SharedServices/Session/sessionhandler.service';

import { SessionExpireService, SessionHandlerService } from '../../Services/index';
// import { SessionHandlerService } from '../Shared/sessionhandler.service';
import { AuthHttp } from '../Auth/authHttp.service';


@Injectable()
export class AuthService {

    private LoginServiceURL: string = AppConstant.APP_URL + 'api/Login';
    private LogoutServiceURL: string = AppConstant.APP_URL + 'api/Logout';
    private TokenServiceURL: string = AppConstant.APP_URL + 'token';

    public isAuthenticated: boolean;
    public onAuth: EventEmitter<boolean>;

    constructor(private http: Http, private router: Router, private _httpAuth: AuthHttp,
        private Session: SessionExpireService, private _userSession: SessionHandlerService, private _Logger: LoggerService) {
        this.onAuth = new EventEmitter<boolean>();
    }
    authenticate(usercreds: User) {
        let headers = new Headers();
        let credentials = 'grant_type=password' + '&username=' + usercreds.MRN + '&Password=' + usercreds.ActivationCode;

        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        headers.append('Accept', 'application/json');

        // return new Promise((resolve) => {
        return this.http.post(this.TokenServiceURL, credentials, { headers: headers })
            /**.subscribe((data) => {
                    window.localStorage.setItem(AuthConfigConsts.DEFAULT_TOKEN_NAME, data.json().access_token);
                    // window.localStorage.setItem(AuthConfigConsts.ISSUED, data.json().issued);
                    // window.localStorage.setItem(AuthConfigConsts.EXPIRES, data.json().expires);
                    this.isAuthenticated = true;
                    resolve(this.isAuthenticated);
                }
            ); */
            .toPromise()
            .then(data => {
                if (data.ok) {
                    this._userSession.createUserSession(data);
                    this.isAuthenticated = true;
                    this._Logger.info(this.isAuthenticated);
                    return (this.isAuthenticated);
                } else {
                    this.isAuthenticated = false;
                    return(this.isAuthenticated);
                }
            })
            .catch(this._Logger.handleError);
        // });
    }

    Login(MRN: string): Promise<boolean> {
        this._Logger.debug('inside Login');
        this._Logger.debug(this.LoginServiceURL);
        this._Logger.debug(MRN);
        this._userSession.setUserId(MRN);
        return this.http.get(this.LoginServiceURL + '/' + MRN)
            .toPromise()
            .then(() => AppConstant.Activation_TimeOut = false)
            .then(() => true)
            .catch(this._Logger.handleError);
        // return Promise.resolve(true);

    }

    logout(): Promise<boolean> {
        this._Logger.debug('inside logout');
        this._Logger.debug(this.LogoutServiceURL);
        return this._httpAuth.get(this.LogoutServiceURL + '/')
            .toPromise()
            .then(() => {
                // AppConstant.Activation_TimeOut = false;
                // this.clearUserSession();

                this.isAuthenticated = false;
                this._userSession.clearUserSession();
                // this.router.navigate(['/Login']);
                // this.Session.stop();
                // this.onAuth.emit(this.isAuthenticated);
            })
            .then(() => true)
            .catch(this._Logger.handleError);
    }
}
