import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../../Services/Auth/auth.service';
import { User } from '../../Services/Auth/user.model';
import { AppConstant } from '../../Services/const.model';
// import { SessionExpireService } from '../../SharedServices/index';
import { SessionExpireService, SessionHandlerService } from '../../Services/index';
//import { SessionHandlerService } from '../Shared/sessionhandler.service';

import { LoggerService } from '../../SharedServices/index';

@Component({
  moduleId: module.id,
  selector: 'app-activationCode',
  templateUrl: './activation-code.component.html'
})

export class ActivationCodeComponent implements OnInit {
  user = new User();
  timer: number;
  tick: number = 1000;
  remainingTime: number;
  interval: any;
  isTimeOut: boolean;
  isValid: boolean = true;

  constructor(private auth: AuthService, private router: Router, private Session: SessionExpireService,
    private _userSession: SessionHandlerService, private _Logger: LoggerService, private translate: TranslateService) { }

  ngOnInit() {
    // To be removed
    // AppConstant.Activation_TimeOut = false;
    if (this._userSession.isLoggedIn()) {
      this._Logger.info('You are Already logged In.');
      this.router.navigate(['/']);
    }else {
      this.isTimeOut = AppConstant.Activation_TimeOut;
      if (this.isTimeOut === false) {
        this._Logger.info(AppConstant.Activation_TimeOut);
        this.expireActivationCode();
      }
    }
  }

  expireActivationCode() {
    this.timer = AppConstant.Activaion_Code_ExpireTime;
    this.interval = setInterval(() => {
      this.remainingTime = this.timer;
      if (this.timer > 0) {
        this.timer = this.timer - 1;
      } else {
        this.stopInterval(false);
      }
    }, this.tick);
  }

  stopInterval(isValid: boolean) {
    clearInterval(this.interval);
    this.isTimeOut = !isValid;
  }

  Activate() {
    this.user.MRN = this._userSession.getUserId();
    this._Logger.debug('ActivationCode is: ', this.user.ActivationCode);
    this._Logger.debug('MRN is: ', this.user.MRN);
    // this.stopInterval(true);

    this.auth.authenticate(this.user)
      .then(res => {
        this._Logger.info(res);
        if (res) {
          // this.StartUserSession();
          this.router.navigate(['/']);
        }
        // tslint:disable-next-line:one-line
        else {
          this._Logger.debug('Invalid code');
        }
      })
      // .catch(err => {alert(err);});
      .catch(err => {
        if (err.status === 404 || err.status === 400) {
          this._Logger.debug('Invalid code');
          this.isValid = false;
        }
      });

  }

  // StartUserSession() {
  //   // start session
  //   this.Session.start();
  // }

  // private handleError(error: any) {
  //   console.error('token failed');
  //   // return Promise.reject(error.message || error);
  // }
}
