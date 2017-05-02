import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { SessionHandlerService } from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';


@Injectable()
export class AuthManagerService implements CanActivate {

    constructor(private _userSession: SessionHandlerService, private router: Router, private _Logger: LoggerService) {}

    canActivate() {
    if (this._userSession.isLoggedIn()) {
        this._Logger.debug('can access');
        return true;
    }
    // tslint:disable-next-line:one-line
    else {
        // this._Logger.debug('Nooo access');
        this.router.navigate(['/Login']);
    }
  }
}
