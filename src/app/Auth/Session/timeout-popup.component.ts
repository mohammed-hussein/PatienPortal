import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { AppConstant, AuthService } from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';
import { SessionExpireService } from '../../Services/index';


@Component({
    moduleId: module.id,
    selector: 'app-timeout-popup',
    templateUrl: './timeout-popup.component.html'
})

export class TimeoutPopupComponent implements OnInit, OnDestroy {
    countdown: number;
    percentage = 100;
    isExpired: boolean;
    sessionActive = true;

    private timeOutsubscribtion: any;
    private SessionStartsubscribtion: any;
    private warningsubscribtion: any;
    private idleEndsubscribtion: any;

    constructor(private router: Router, private Session: SessionExpireService, private _AuthService: AuthService,
                private _Logger: LoggerService, private translate: TranslateService) {

        this.SessionStartsubscribtion = Session.onSessionStart.subscribe(() => this.sessionStartHandler());
        this.warningsubscribtion = Session.onTimeoutWarning.subscribe((count: number) => this.sessionWarningHandler(count));
        this.timeOutsubscribtion = Session.onSessionTimeout.subscribe(() => this.sessionExpiredHandler());
        this.idleEndsubscribtion = Session.onIdleEnd.subscribe(() => this.IdleEndHandler());
    }

    ngOnInit() { }

    ngOnDestroy() {
        this._Logger.debug('unsubscribe from login');
        this.timeOutsubscribtion.unsubscribe();
        this.SessionStartsubscribtion.unsubscribe();
        this.warningsubscribtion.unsubscribe();
        this.idleEndsubscribtion.unsubscribe();
    }

    sessionStartHandler() {
        this._Logger.debug('Session started..');
        this.sessionActive = true;
    }
    sessionExpiredHandler() {
        this.sessionActive = false;
        this.isExpired = true;
        this._AuthService.logout().then(() => this._Logger.debug('Log out'));
    }

    sessionWarningHandler(counter: number) {
        this.sessionActive = false;
        this.isExpired = false;
        this.countdown = counter;
        this.percentage = (this.countdown / AppConstant.Session_Expire_Warning) * 100;
    }

    IdleEndHandler() {
        this.sessionActive = true;
        this.isExpired = false;
    }

    onClose() {
        this.sessionActive = true;
    }
}
