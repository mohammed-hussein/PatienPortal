import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppointmentSurvey, MedicalFunctionsService, SessionHandlerService, Appointment } from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'appoint-satisfaction',
    templateUrl: 'appointements-satisfaction.component.html'
})
export class AppointementsSatisfactionComponent implements OnInit {
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

    constructor(private _AppointmentService: MedicalFunctionsService, private _Logger: LoggerService, private translate: TranslateService,
        private _userSession: SessionHandlerService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.AppointId = params['id'];
            this.isSaved = false;
            if (this.AppointId) {
                this.show = true;

                this.appointSurvey = new AppointmentSurvey();
                this.appointSurvey.Answer1 = '';
                this.appointSurvey.Answer2 = '';
                this.appointSurvey.Answer3 = '';
                this.appointSurvey.Answer4 = '';
                this.appointSurvey.Answer5 = '';
                this.appointSurvey.Answer6 = '';

                this.getAppointment();
                this.getAppointmentReview(this.AppointId);
            }
        });
    }

    getAppointment() {
        this.English_Name = this._userSession.getEnglishName();
        this.Arabic_Name = this._userSession.getArabicName();
        this.appointment = new Appointment();
        this._Logger.info(this._AppointmentService.selectedAppointment);
        if (this._AppointmentService.selectedAppointment) {
            if (this._AppointmentService.selectedAppointment.error_msg !== '') {
                this.appointment = this._AppointmentService.selectedAppointment;
            } else {
                this.router.navigate(['Appointments']);
            }
        }
    }

    getAppointmentReview(APPoID: string) {
        this._AppointmentService.getAppointmentReview(APPoID)
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

    test() {
        alert('hiii');
    }

    onSave() {
        this.appointSurvey.AppointmentID = this.AppointId;
        this._Logger.info(this.appointSurvey);
        this._AppointmentService.addsurveyAppointement(this.appointSurvey)
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

    onClose() {
        this.show = false;
    }

}
