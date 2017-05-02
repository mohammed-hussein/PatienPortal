import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { AppConstant, AuthService } from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';
import { SessionExpireService } from '../../Services/index';


@Component({
    moduleId: module.id,
    selector: 'Session-Timeout',
    templateUrl: './session-timeout.component.html'
})

export class SessionTimeoutComponent implements OnInit, OnDestroy {
    countdown: number;
    percentage: number = 100;
    isExpired: boolean;
    sessionActive: boolean;
    private timeOutsubscribtion: any;
    private SessionStartsubscribtion: any;
    private warningsubscribtion: any;

    constructor(private router: Router, private Session: SessionExpireService, private _AuthService: AuthService,
                private _Logger: LoggerService, private translate: TranslateService) {

        this.SessionStartsubscribtion = Session.onSessionStart.subscribe(() => this.sessionStartHandler());
        this.warningsubscribtion = Session.onTimeoutWarning.subscribe((count: number) => this.sessionWarningHandler(count));
        this.timeOutsubscribtion = Session.onSessionTimeout.subscribe(() => this.sessionExpiredHandler());
    }

    ngOnInit() { }

    ngOnDestroy() {
        this._Logger.debug('unsubscribe from login');
        this.timeOutsubscribtion.unsubscribe();
        this.SessionStartsubscribtion.unsubscribe();
        this.warningsubscribtion.unsubscribe();
    }

    sessionStartHandler() {
        this._Logger.debug('Session started..');
        this.sessionActive = true;
    }
    sessionExpiredHandler() {
        this.isExpired = true;
        this.sessionActive = false;
        this._AuthService.logout().then(() => this._Logger.debug('Log out'));
    }

    sessionWarningHandler(counter: number) {
        this.sessionActive = false;
        this.countdown = counter;
        this.percentage = (this.countdown / AppConstant.Session_Expire_Warning) * 100;
    }
}
