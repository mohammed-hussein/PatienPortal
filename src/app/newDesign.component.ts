import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { SessionExpireService } from './Services/index';
import { AuthHttp } from './Services/index';
// import { SessionExpireService } from './SharedServices/index';

@Component({
    moduleId: module.id,
    selector: 'New-app',
    templateUrl: './newDesign.component.html'
})
export class NewDesignComponent implements OnInit, OnDestroy {
    private subscribtion: any;
    private langSubscribtion: any;
    lang: string;

    constructor(private router: Router, private Session: SessionExpireService,
        private translate: TranslateService, private _AuthHttp: AuthHttp) {

        translate.addLangs(['en-US', 'ar-SA']);
        translate.setDefaultLang('en-US');
        this.lang = 'en-US';
        this.langSubscribtion = translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.lang = event.lang;
        });

        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en-US|ar-SA/) ? browserLang : 'en-US');

        this.subscribtion = Session.onTimeoutWarning.subscribe(() => {
            this.router.navigate(['/Sessiontimeout']);
        });
    }

    ngOnInit() { }

    changeLanguage(lang: any) {
        this.translate.use(lang);
        // this.lang = lang;
        this._AuthHttp.SetLanguage(lang);
        // this.router.navigate(['']);
    }

    ngOnDestroy() {
        // this._Logger.debug('unsubscribe from login');
        this.subscribtion.unsubscribe();
    }
}
