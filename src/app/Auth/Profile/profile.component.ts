import { Component, OnInit, OnDestroy } from '@angular/core';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { ProfileService, PatientRecored, AuthService } from '../../Services/index';
import { LoggerService, LoadingService } from '../../SharedServices/index';
import { SessionHandlerService } from '../../Services/index';

@Component({
    moduleId: module.id,
    selector: 'user-profile',
    templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit, OnDestroy {
    record: PatientRecored;
    private subscribtion: any;

    constructor(private _ProfileService: ProfileService, private _Logger: LoggerService, public _LoadingService: LoadingService,
                private _userSession: SessionHandlerService, private auth: AuthService, private translate: TranslateService) {
        this.record = new PatientRecored();
        this.subscribtion = translate.onLangChange.subscribe(this.langChanged);
    }

    langChanged(event: LangChangeEvent) {
        // this._Logger.info(event.lang + ' from User ProfileComponent');
    }

    ngOnInit() {
        this.getProfileData();
    }

    ngOnDestroy() {
        this._Logger.info('unsubscribe from onLangChange @ User ProfileComponent');
        this.subscribtion.unsubscribe();
    }

    getProfileData() {
        this._ProfileService.getProfileData()
            .then(data => {
                this._Logger.info(data);
                this.record = data;
                this.record.MRN = this._userSession.getUserId();
                this.record.iqama = +this.record.iqama > 0 ? this.record.iqama : '';
            })
            .catch(err => this._Logger.debug(err));
    }

    get diagnostic() { return JSON.stringify(this.record); }
}
