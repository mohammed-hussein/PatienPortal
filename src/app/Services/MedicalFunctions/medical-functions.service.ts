import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

import { AuthHttp, AppConstant, Appointment, Diagnosis, Medication, LabProcedure, Radiology, AppointmentSurvey } from '../index';
import { LoggerService } from '../../SharedServices/index';

@Injectable()
export class MedicalFunctionsService {
    private headers = new Headers({ 'Content-Type': 'application/json' });

    private appointmentsServiceURL: string = AppConstant.APP_URL + 'api/MedicalFunc/Appointments';
    private previousAppointmentsServiceURL: string = AppConstant.APP_URL + 'api/MedicalFunc/Appointments/Previous';
    private surveyAppointmentsServiceURL: string = AppConstant.APP_URL + 'api/MedicalFunc/Appointments/Previous/Survey';
    // private cancelAppointmentsServiceURL: string = AppConstant.APP_URL + 'api/MedicalFunc/Appointment/12345/Cancel';

    private diagnosisServiceURL: string = AppConstant.APP_URL + 'api/MedicalFunc/Diagnosis';
    private medicationServiceURL: string = AppConstant.APP_URL + 'api/MedicalFunc/Medication';
    private labServiceURL: string = AppConstant.APP_URL + 'api/MedicalFunc/Lab';
    private labSubtestsServiceURL: string = AppConstant.APP_URL + 'api/MedicalFunc/LabSubTests/';
    private radiologyServiceURL: string = AppConstant.APP_URL + 'api/MedicalFunc/Radiology';

    public selectedAppointment: Appointment;
    public selectedMedication: Medication;
    public selectedDiagnos: Diagnosis;
    public selectedRadiology: Radiology;
    public selectedLab: LabProcedure;

    // Observable string sources
    private appointmentsSource = new Subject<Appointment[]>();
    public appointmentsData = this.appointmentsSource.asObservable();
    // public Appointmentsdata: Observable<number>;

    constructor(private _httpAuth: AuthHttp, private _Logger: LoggerService) { }

    getAppointments(isPrevious: boolean): Observable<Appointment[]> {
        let Appointurl = this.appointmentsServiceURL;
        if (isPrevious) {
            Appointurl = this.previousAppointmentsServiceURL;
        }
        return this._httpAuth.get(Appointurl)
            .map(res => {
                let data = res.json() as Appointment[];
                if (!isPrevious) {
                    this.appointmentsSource.next(data);
                }
                return data;
            }).catch(this._Logger.handleError);
        /*
            .toPromise()
            .then(data => data.json() as Appointment[])
            .catch(this._Logger.handleError);
        */
    }

    cancelAppointments(APPOID: string): Promise<string> {
        return this._httpAuth.post(this.appointmentsServiceURL + '/' + APPOID + '/Cancel', JSON.stringify(''), { headers: this.headers })
            .toPromise()
            .then(response => response.json())
            .catch(this._Logger.handleError);
    }

    surveyAppointements(survey: AppointmentSurvey) {
        return this._httpAuth.post(this.surveyAppointmentsServiceURL, JSON.stringify(survey), { headers: this.headers })
            .toPromise()
            .then(response => response.json())
            .catch(this._Logger.handleError);
    }

    getDiagnosis(): Promise<Diagnosis[]> {
        return this._httpAuth.get(this.diagnosisServiceURL)
            .toPromise()
            .then(data => data.json() as Diagnosis[])
            .catch(this._Logger.handleError);

    }

    getMedications(): Promise<Medication[]> {
        return this._httpAuth.get(this.medicationServiceURL)
            .toPromise()
            .then(data => data.json() as Medication[])
            .catch(this._Logger.handleError);

    }

    getLabProcedures(): Promise<LabProcedure[]> {
        return this._httpAuth.get(this.labServiceURL)
            .toPromise()
            .then(data => data.json() as LabProcedure[])
            .catch(this._Logger.handleError);

    }

    getLabSubTest(TestId: string): Promise<LabProcedure[]> {
        return this._httpAuth.get(this.labSubtestsServiceURL + TestId)
            .toPromise()
            .then(data => data.json() as LabProcedure[])
            .catch(this._Logger.handleError);

    }

    getRadiologies(): Promise<Radiology[]> {
        return this._httpAuth.get(this.radiologyServiceURL)
            .toPromise()
            .then(data => data.json() as Radiology[])
            .catch(this._Logger.handleError);

    }

    // Handle errors
    // private handleError(error: any): Promise<any> {
    //     console.error('An error occurred', error); // for demo purposes only
    //     return Promise.reject(error.message || error);
    // }

}
