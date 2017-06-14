import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppointmentSurvey, SessionHandlerService, Appointment, PublicService } from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'public-satisfaction',
    templateUrl: 'appointments-satisfaction-public.component.html'
})
export class AppointmentsSatisfactionPublicComponent implements OnInit {
    RandomNum: string;
    AppointId: string;
    appointment: Appointment;
    appointSurvey: AppointmentSurvey;
    Arabic_Name: string;
    English_Name: string;
    show = false;
    isReviewed = false;
    isSaved = false;
    resultEnglishMSG: any;
    resultArabicMSG: any;
    result: any;
    isLoading = true;

    constructor(private _PublicService: PublicService, private _Logger: LoggerService, private translate: TranslateService,
        private _userSession: SessionHandlerService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.RandomNum = params['id'];
            this.isSaved = false;
            if (this.RandomNum) {
                this.show = true;

                this.appointSurvey = new AppointmentSurvey();
                this.appointSurvey.Answer1 = '';
                this.appointSurvey.Answer2 = '';
                this.appointSurvey.Answer3 = '';
                this.appointSurvey.Answer4 = '';
                this.appointSurvey.Answer5 = '';
                this.appointSurvey.Answer6 = '';

                // this.getAppointment();
                this.getAppointmentReview(this.RandomNum);
            }
        });
    }

    getAppointmentReview(RandomNumber: string) {
        this._PublicService.getAppointmentReview(RandomNumber)
            .then(data => {
                this._Logger.info(data);
                this.appointSurvey = data as AppointmentSurvey;
                if (this.appointSurvey.Reviewd !== 'NO') {
                    this.isReviewed = true;
                }
                this.isLoading = false;
            })
            .catch(error => this._Logger.Error(error));
    }

    SelectItem(event) {
        // alert('event');
        $(event).prop('checked', true); // .button("refresh");
        // let target = event.target || event.srcElement || event.currentTarget;
    }

    onSave() {
        this.appointSurvey.AppointmentID = this.AppointId;
        this._Logger.info(this.appointSurvey);
        this._PublicService.addsurveyAppointement(this.RandomNum, this.appointSurvey)
            .then(data => {
                this._Logger.info(data);
                this.result = data;
                this.resultEnglishMSG = data.EnglishMSG;
                this.resultArabicMSG = data.ArabicMSG;
                this.isSaved = true;
                this.isReviewed = true;
            })
            .catch(error => this._Logger.Error(error));
    }
}
