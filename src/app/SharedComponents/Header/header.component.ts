import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import {
    AuthService, ProfileService, PatientRecored,
    Appointment, MedicalFunctionsService, SessionHandlerService
} from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';
import { TellusService } from '../../Services/tellus.service';

import { AuthConfigConsts } from '../../Services/const.model';

@Component({
    moduleId: module.id,
    selector: 'app-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    MRN: string;
    isAuthenticated: boolean;
    record: PatientRecored;
    appointment: Appointment;
    private subscribtion: any;
    private appointsubscribtion: any;
    feedback_type: string;

    constructor(private _ProfileService: ProfileService, private _tellUs: TellusService,
        private _userSession: SessionHandlerService, private _Appointment: MedicalFunctionsService,
        private router: Router, private _Logger: LoggerService, private translate: TranslateService) {

        this.record = null;
        this.MRN = null;
        this.appointment = null;

        this.subscribtion = this._userSession.onAuth
            .subscribe((result: boolean) => this.isLogedIn(result));

        this.appointsubscribtion = this._Appointment.appointmentsData
            .subscribe((appoints: Appointment[]) => this.subscribeToAppointments(appoints));
    }

    subscribeToAppointments(appoints: Appointment[]) {
        this._Logger.info('subscribe to appointment data');
        if (appoints) {
            this.appointment = appoints[0];
            // this.appointment = new Date(this.appointment.APPODATE);
            // this._Logger.Warning(this.appointment);
        }
    }

    ngOnInit() {
        this.feedback_type = 'Question';
        this.isAuthenticated = false;
        this._Logger.debug('header - ngOnInit - isAuthenticated: ' + this._userSession.isLoggedIn());
        this.isAuthenticated = this._userSession.isLoggedIn();
        if (this.isAuthenticated) {
            this.getProfileData();
            this.getAppointment();
        }
        // this.isAuthenticated = this.router.url === '/Login' ? false : true;
    }

    getAppointment() {
        if (!this.appointment) {
            this._Appointment.getAppointments(false)
                .toPromise();
            // .then(data => {
            //     this.showData = true;
            //     this._Logger.info(data);
            //     this.appointments = data as Appointment[];
            //     this._Logger.info(this.appointments);
            //     if (this.appointments) {
            //         this.onSelect(this.appointments[0]);
            //     }
            // })
            // .catch(error => this.handleNoData(error));
        }
    }

    getProfileData() {
        this._ProfileService.getProfileData()
            .then(data => {
                this.record = data;
                this.MRN = this._userSession.getUserId();
                // this.record.MRN = this._AuthService.getUserId();
                // this._userSession.setUserName(this.record.English_Name + AuthConfigConsts.SEPERATOR + this.record.Arabic_name);
                this._userSession.setArabicName(this.record.Arabic_name);
                this._userSession.setEnglishName(this.record.English_Name);
            })
            .catch(err => this._Logger.debug(err));
    }

    ngOnDestroy() {
        this._Logger.debug('unsubscribe from login');
        this.subscribtion.unsubscribe();
        this.appointsubscribtion.unsubscribe();
        this.record = null;
        this.MRN = null;
        this.appointment = null;
    }

    isLogedIn(value: boolean) {
        this._Logger.debug('header - isLogedIn - isAuthenticated: ' + this._userSession.isLoggedIn());
        this.isAuthenticated = this._userSession.isLoggedIn();
        if (this.isAuthenticated) {
            this.getProfileData();
            this.getAppointment();
        } else {
            this.record = null;
            this.MRN = null;
            this.appointment = null;
        }
    }

    openAdd(type: string) {
        // this.feedback_type = 'Idea';
        // // this._tellUs.Feedback_Type = type;
        // let element = document.getElementById('id_Addfeedback');
        // element.style.display = 'block';
        // this.router.navigate(['Feedbacks/add', 'Idea']);
        this.router.navigate(['AddFeedback', type]);
    }
}
