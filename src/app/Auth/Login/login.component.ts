import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../../Services/Auth/auth.service';
import { LoggerService } from '../../SharedServices/index';
import { SessionHandlerService } from '../../Services/index';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  MRN: string;
  isValid: boolean = true;

  constructor(private auth: AuthService, private _userSession: SessionHandlerService,
    private router: Router, private _Logger: LoggerService, private translate: TranslateService) { }

  ngOnInit() {
    if (this._userSession.isLoggedIn()) {
      this._Logger.info('You are Already logged In.');
      this.router.navigate(['/']);
    }
  }

  login() {
    this._Logger.info('MRN is ' + this.MRN);
    // this.isValid = false;

    this.auth.Login(this.MRN)
      .then(res => {
        if (res) {
          this._Logger.info('MRN is valid');
          this.router.navigate(['/Activate']);
        } else {
          this.isValid = false;
          this._Logger.debug('Invalid MRN');
        }
      })
      .catch(err => {
        if (err.status === 404 || err.status === 400) {
          this._Logger.debug('Invalid MRN');
          this.isValid = false;
          this.MRN = undefined;
        }
      });

  }
}
