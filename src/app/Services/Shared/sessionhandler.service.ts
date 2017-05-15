import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { SessionExpireService } from './session-expire.service';
import { AuthConfigConsts, AppConstant } from '../../Services/const.model';

@Injectable()
export class SessionHandlerService {
    public onAuth: EventEmitter<boolean>;

    constructor(private Session: SessionExpireService, private router: Router) {
        this.onAuth = new EventEmitter<boolean>();
    }

    createUserSession(data: any) {
        // this._Logger.debug('start User Session');

        sessionStorage.setItem(AuthConfigConsts.DEFAULT_TOKEN_NAME, data.json().access_token);
        // sessionStorage.setItem(AuthConfigConsts.USER_Name, data.json().userName);
        // sessionStorage.setItem(AuthConfigConsts.USER_Phone, data.json().userPhone);
        sessionStorage.setItem(AuthConfigConsts.EXPIRES_IN, data.json().expires_in);

        this.StartUserSession();
        this.onAuth.emit(true);
    }

    clearUserSession() {
        // this._Logger.debug('clear User Session');

        this.StopUserSession();

        sessionStorage.removeItem(AuthConfigConsts.DEFAULT_TOKEN_NAME);
        sessionStorage.removeItem(AuthConfigConsts.USER_ID);
        sessionStorage.removeItem(AuthConfigConsts.USER_Name_Arabic);
        sessionStorage.removeItem(AuthConfigConsts.USER_Name_English);
        sessionStorage.removeItem(AuthConfigConsts.USER_Phone);
        sessionStorage.removeItem(AuthConfigConsts.EXPIRES_IN);

        this.onAuth.emit(false);
        this.router.navigate(['/Login']);
    }

    private StartUserSession() {
        // start session
        AppConstant.Activation_TimeOut = true;
        // expire before 1 minute from Server Side expire
        // AppConstant.Session_Time = this.getExpire_in() - AppConstant.SESSION_DELAY_TIME;
        this.Session.start();
    }

    private StopUserSession() {
        AppConstant.Activation_TimeOut = false;
        this.Session.stop();
    }

    isLoggedIn(): boolean {
        // return this.isAuthenticated;
        let token = sessionStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME);
        return token !== null;
    }

    getUserId(): string {
        let userId = sessionStorage.getItem(AuthConfigConsts.USER_ID);
        // let userId = localStorage.getItem(AuthConfigConsts.USER_ID);
        return userId;
    }

    setUserId(userID: string) {
        sessionStorage.setItem(AuthConfigConsts.USER_ID, userID);
        // localStorage.setItem(AuthConfigConsts.USER_ID, userID);
    }

    getEnglishName(): string {
        let userName = sessionStorage.getItem(AuthConfigConsts.USER_Name_English);
        return userName;
    }

    setEnglishName(englishUserName: string) {
        sessionStorage.setItem(AuthConfigConsts.USER_Name_English, englishUserName);
    }

    getArabicName(): string {
        let userName = sessionStorage.getItem(AuthConfigConsts.USER_Name_Arabic);
        return userName;
    }

    setArabicName(arabicUserName: string) {
        sessionStorage.setItem(AuthConfigConsts.USER_Name_Arabic, arabicUserName);
    }

    getUserPhone(): string {
        let userPhone = sessionStorage.getItem(AuthConfigConsts.USER_Phone);
        return userPhone;
    }

    tokenNotExpired(tokenName = AuthConfigConsts.DEFAULT_TOKEN_NAME, jwt?: string): boolean {

        const token: string = sessionStorage.getItem(tokenName);

        return token != null;
    }

    private getExpire_in(): number {
        let Expire_in = + sessionStorage.getItem(AuthConfigConsts.EXPIRES_IN) || 0;
        return Expire_in;
    }

}

