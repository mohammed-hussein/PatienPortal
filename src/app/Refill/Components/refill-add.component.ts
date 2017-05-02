import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { RefillRequest } from '../../Services/Refill/request.model';
import { RefillService } from '../../Services/Refill/refill.service';
import { City } from '../../Services/Refill/city.model';
import { LoggerService } from '../../SharedServices/index';
import { AuthService, SessionHandlerService } from '../../Services/index';

declare var Pikaday: any;

@Component({
    moduleId: module.id,
    selector: 'refill-add',
    templateUrl: 'refill-add.component.html'
})
export class AddRefillComponent implements OnInit {
    refillRequest: RefillRequest;
    cities: City[];
    MRN: string;
    PatientArabicName: string;
    PatientEnglishName: string;
    isSaved = false;
    isError = false;
    errorMsg: string;
    isValidDate = true;
    minDate: string = '2016-12-10';

    constructor(private _RefillService: RefillService, private auth: AuthService,
                private _userSession: SessionHandlerService, private _Logger: LoggerService, private translate: TranslateService) {
    }

    ngOnInit() {
        this.getCities();

        this.isSaved = false;
        // this.MRN = this._userSession.getUserId();
        this.PatientArabicName = this._userSession.getArabicName();
        this.PatientEnglishName = this._userSession.getEnglishName();
        this.refillRequest = new RefillRequest();
        this.refillRequest.receivingMethod = 'DHL';
        this.refillRequest.IsPharmcy = false;
        this.refillRequest.city = '';

        this.isValidDate = true;
        let minDT = new Date();
        minDT.setDate(minDT.getDate() + 7);
        // this.minDate = minDT.toLocaleDateString();
        this.minDate = minDT.toISOString().substring(0, 10);
        this._Logger.debug(this.minDate);

        this.getPikaday();

        // let date = document.querySelector('[type=date]');
        // date.addEventListener('input', this.disableWeekends);
    }

    getCities(): void {
        this._RefillService.getCities().then(data => this.cities = data).then(() => this._Logger.info(this.cities));
    }

    onSubmit(): void {
        // this.isSaved = true;
        // alert(this.refillRequest.receivingDate);
        this._RefillService.addRequest(this.refillRequest).then(data => this.isSaved = data)
            .then(result => this._Logger.info(result))
            .catch(err => {
                this.isError = true;
                this._Logger.Error(err);
            });
    }

    onClose() {
        this.ngOnInit();
        let element = document.getElementById('id_Addrefill');
        element.style.display = 'none';
    }

    Setvalue(): void {
        this.refillRequest.IsPharmcy = true;
        if (this.refillRequest.receivingMethod === 'DHL') {
            this.refillRequest.IsPharmcy = false;
        }
        this._Logger.info(this.refillRequest.IsPharmcy);
    }

    // not used anymore
    disableWeekends(v: any, e: HTMLInputElement) {
        this._Logger.debug('inisde dsiable weekends');
        if (v !== null) {
            let date = new Date(v.target.value);
            let day = date.getDay();
            // let day = new Date(e.target.value).getDay();
            // Days in JS range from 0-6 where 0 is Sunday and 6 is Saturday
            if (day === 5 || day === 6 || date.toISOString().substring(0, 10) < this.minDate) {
                // e.target.setCustomValidity('OH NOES! We hate Mondays! Please pick any day but Monday.'); 
                this.refillRequest = new RefillRequest();
                this.refillRequest.receivingMethod = 'Pharmacy';
                this.refillRequest.IsPharmcy = true;
                e.value = null;
                this.isValidDate = false;
                return false;
            } else {
                this.isValidDate = true;
            }
        }
    }

    getPikaday() {
        // let picker = new Pikaday({ field: document.getElementById('datepicker1') });
        // let disable = false;
        let picker = new Pikaday(
            {
                field: document.getElementById('datepicker'),
                // format: 'YYYY-MM-DD',
                disableWeekends: true,
                firstDay: 0,
                minDate: new Date(),
                maxDate: new Date(2020, 12, 31),
                isWeekend: function (date: Date) {
                    this._Logger.debug('inisde isWeekend function');
                    let day = date.getDay();
                    return day === 5 || day === 6;
                },
            });

        // disableDayFn: function (theDate: any) {
        //     return this.disableWeekendsDay(theDate);
        //     //return disable = !disable;
        // }

        // yearRange: [2000, 2020]
    }

    disableWeekendsDay(date: any): boolean {
        this._Logger.debug('inisde disableWeekendsDay function');
        if (date !== null) {
            let day = date.getDay();
            // let day = new Date(e.target.value).getDay();
            // Days in JS range from 0-6 where 0 is Sunday and 6 is Saturday
            if (day === 5 || day === 6) {
                return false;
            } else {
                return true;
            }
        }
    }

    get diagnostic() { return JSON.stringify(this.refillRequest); }
}
