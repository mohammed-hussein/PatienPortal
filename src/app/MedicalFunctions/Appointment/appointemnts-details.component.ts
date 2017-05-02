import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import 'JsBarcode';

import { Appointment, MedicalFunctionsService, SessionHandlerService } from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';
import { AuthConfigConsts } from '../../Services/const.model';

declare var $: any;
declare var JsBarcode: any;

@Component({
    moduleId: module.id,
    selector: 'appoint-details',
    templateUrl: 'appointemnts-details.component.html'
})
export class AppointemntsDetailsComponent implements OnInit {
    appointment: Appointment;
    APPOID: string;
    MRN: string;
    Arabic_Name: string;
    EnglishName: string;

    constructor(private route: ActivatedRoute, private _Appointment: MedicalFunctionsService, private _userSession: SessionHandlerService,
        private router: Router, private _Logger: LoggerService, private translate: TranslateService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.APPOID = params['id']; // (+) converts string 'id' to a number
            this.getAppointment();
        });
    }

    getAppointment() {
        this.MRN = this._userSession.getUserId();
        this.EnglishName = this._userSession.getEnglishName();
        this.Arabic_Name = this._userSession.getArabicName();
        this.appointment = new Appointment();
        this._Logger.info(this._Appointment.selectedAppointment);
        if (this._Appointment.selectedAppointment) {
            if (this._Appointment.selectedAppointment.error_msg !== '') {
                this.appointment = this._Appointment.selectedAppointment;
            } else {
                this.router.navigate(['Appointments']);
            }
        }
        // }else {
        //     this.router.navigate(['Appointments']);
    }

    cancelAppointment() {
        let result = confirm('Are you sure to cancel Appointment!');
        if (result === true) {
            this._Appointment.cancelAppointments(this.APPOID).then(data => alert(data))
                .catch(error => this._Logger.Error(error));
        } else { }
    }

    printAppointment() {
        JsBarcode('#barcode', this.MRN, {
            height: 30,
        });

        this._Logger.debug('start printing..');
        window.print();

        // $('#printArea').show();
        // $('#printArea').removeClass('w3-hide');

        // let printContents = document.getElementById('printArea').innerHTML;
        // let originalContents = document.body.innerHTML;

        // document.body.innerHTML = printContents;

        // window.print();

        // document.body.innerHTML = originalContents;
    }
}
