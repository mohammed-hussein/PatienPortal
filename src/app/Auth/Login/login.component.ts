import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../../Services/Auth/auth.service';
import { LoggerService, LoadingService } from '../../SharedServices/index';
import { SessionHandlerService } from '../../Services/index';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
  MRN: string;
  isValid = true;
  // isLoading = false;

  constructor(private auth: AuthService, private _userSession: SessionHandlerService,
    private router: Router, private _Logger: LoggerService, private translate: TranslateService, public _LoadingService: LoadingService) { }

  ngOnInit() {
    if (this._userSession.isLoggedIn()) {
      this._Logger.info('You are Already logged In.');
      this.router.navigate(['/']);
    }
  }

  login() {
    this._Logger.info('MRN is ' + this.MRN);
    this.isValid = true;
    this._LoadingService.start();

    this.auth.Login(this.MRN)
      .then(res => {
        if (res) {
          this._Logger.info('MRN is valid');
          this.router.navigate(['/Activate']);
          this._LoadingService.done();
        } else {
          this.isValid = false;
          this._LoadingService.done();
          this._Logger.debug('Invalid MRN');
        }
      })
      .catch(err => {
        if (err.status === 404 || err.status === 400) {
          this._Logger.debug('Invalid MRN');
          this.isValid = false;
          this._LoadingService.done();
          this.MRN = undefined;
        }
      });
  }

  ngOnDestroy() {
        this._LoadingService.done();
    }

}
