import { Component, OnInit, OnDestroy } from '@angular/core';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';


@Component({
    moduleId: module.id,
    selector: 'appoint-container',
    templateUrl: 'appointments-container.component.html'
})
export class AppointmentsContainerComponent implements OnInit, OnDestroy {

    private subscribtion: any;

    constructor(private translate: TranslateService) {
        this.subscribtion = this.translate.onLangChange.subscribe(this.langChanged);
    }

    langChanged(event: LangChangeEvent) {
        // alert(event.lang + 'from appointments');
    }


    ngOnInit() { }

    ngOnDestroy() {
        this.subscribtion.unsubscribe();
    }

}
