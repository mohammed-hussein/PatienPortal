import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { AuthService, SessionHandlerService } from '../../Services/index';
import {LoggerService} from '../../SharedServices/index';

@Component({
    moduleId: module.id,
    selector: 'logout',
    templateUrl: 'logout.component.html'
})
export class LogoutComponent implements OnInit, OnDestroy {
    isAuthenticated: boolean = false;
    private subscribtion: any;
    @Input() isAnimate: boolean = false;

    constructor(private router: Router, private _AuthService: AuthService,
                private _userSession: SessionHandlerService, private _Logger: LoggerService, private translate: TranslateService) {
        this.subscribtion = this._userSession.onAuth.subscribe((result: boolean) => this.isLogedIn(result));
    }

    ngOnInit() {
        // this.isAuthenticated = this._AuthService.isAuthenticated;
        this.isAuthenticated = this._userSession.isLoggedIn();
    }

    ngOnDestroy() {
        this._Logger.debug('unsubscribe from login');
        this.subscribtion.unsubscribe();
    }

    isLogedIn(value: boolean) {
        this.isAuthenticated = this._userSession.isLoggedIn();
        this._Logger.debug('logout - isLogedIn - isAuthenticated: ' + this.isAuthenticated);
    }

    signOut() {
        this._AuthService.logout().then(() => this._Logger.debug('Log out'));
    }
}
