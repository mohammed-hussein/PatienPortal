import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { Appointment, MedicalFunctionsService } from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';

@Component({
    moduleId: module.id,
    selector: 'appoint-all',
    templateUrl: 'appointments-all.component.html'
})

export class AppointmentsAllComponent implements OnInit {
    appointments: Appointment[];
    selectedAppoint: Appointment;
    showData: boolean = true;
    isPervious: boolean = false;
    // NoData: boolean = false;

    constructor(private _Appointment: MedicalFunctionsService, private _Logger: LoggerService,
        private router: Router, private route: ActivatedRoute, private translate: TranslateService) { }

    ngOnInit(): void {
        // this.showData = false;
        this.route.params.subscribe(params => {
            let ParamValue = params['id'];
            if (ParamValue && ParamValue.toLowerCase() === 'previous'.toLowerCase()) {
                this.isPervious = true;
            }
        });
        this.GetAppointments();
    }

    GetAppointments(): void {
        // alert(this.isPervious);
        this._Appointment.getAppointments(this.isPervious)
            .toPromise()
            .then(data => {
                this.showData = true;
                this._Logger.info(data);
                this.appointments = data as Appointment[];
                this._Logger.info(this.appointments);
                if (this.appointments) {
                    this.onSelect(this.appointments[0]);
                }
            })
            .catch(error => this.handleNoData(error));
    };

    onSelect(appointment: Appointment): void {
        this.selectedAppoint = appointment;
        this._Appointment.selectedAppointment = new Appointment();
        this._Appointment.selectedAppointment = appointment;
        if (appointment) {
            this.router.navigate(['details', appointment.APPOID], { relativeTo: this.route });
        }
    }

    handleNoData(ERR: any) {
        if (ERR.status === 404) {
            this.showData = false;
            let error = JSON.parse(ERR._body);
            error = error['Message'];
            this.router.navigate(['nodata', error], { relativeTo: this.route });
        } else {
            this._Logger.Error(ERR);
        }
    }
}
