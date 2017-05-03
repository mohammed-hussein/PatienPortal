import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppointmentSurvey, MedicalFunctionsService } from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';
import { TranslateService } from '@ngx-translate/core';

@Component({
    moduleId: module.id,
    selector: 'appoint-satisfaction',
    templateUrl: 'appointements-satisfaction.component.html'
})
export class AppointementsSatisfactionComponent implements OnInit {
    AppointId: string;
    show = false;

    constructor(private _AppointmentService: MedicalFunctionsService, private _Logger: LoggerService, private translate: TranslateService,
                private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.AppointId = params['id'];
            if (this.AppointId) {
                this.show = true;
            }
        });
    }

    onClose() {
        this.show = false;
        // this.router.navigate(['Appoint/previous']);
        this.router.navigate(['Appoint/previous/details', this.AppointId]);
    }

}
