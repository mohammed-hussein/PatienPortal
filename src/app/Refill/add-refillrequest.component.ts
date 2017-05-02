import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { RefillRequest } from '../Services/Refill/request.model';
import { RefillService } from '../Services/Refill/refill.service';
import { City } from '../Services/Refill/city.model';
import { LoggerService } from '../SharedServices/index';

@Component({
    moduleId: module.id,
    selector: '<add-Refillreq></add-Refillreq>',
    templateUrl: './add-refillrequest.component.html'
})

export class AddRefillRequestComponent implements OnInit {
    refillRequest: RefillRequest;
    cities: City[];
    isSaved = false;
    isError = false;
    errorMsg: string;
    isValidDate = true;
    minDate: string = '2016-12-10';

    // studentForm: FormGroup;

    constructor(private _RefillService: RefillService, private _Logger: LoggerService) { }

    ngOnInit() {
        this.getCities();

        this.refillRequest = new RefillRequest();
        this.refillRequest.receivingMethod = 'DHL';
        this.refillRequest.IsPharmcy = false;

        this.isValidDate = true;
        let minDT = new Date();
        minDT.setDate(minDT.getDate() + 7);
        // this.minDate = minDT.toLocaleDateString();
        this.minDate = minDT.toISOString().substring(0, 10);
        this._Logger.debug(this.minDate);

        // let date = document.querySelector('[type=date]');
        // date.addEventListener('input', this.disableWeekends);
    }

    getCities(): void {
        this._RefillService.getCities().then(data => this.cities = data).then(() => this._Logger.info(this.cities));
    }

    onSubmit(): void {
        // this.isSaved = true;
        this._RefillService.addRequest(this.refillRequest).then(data => this.isSaved = data)
            .then(result => this._Logger.info(result))
            .catch(err => {
                this.isError = true;
                this._Logger.Error(err);
            });
    }

    Setvalue(): void {
        this.refillRequest.IsPharmcy = true;
        if (this.refillRequest.receivingMethod === 'DHL') {
            this.refillRequest.IsPharmcy = false;
        }
        this._Logger.info(this.refillRequest.IsPharmcy);
    }

    disableWeekends(v: any, e: HTMLInputElement) {
        this._Logger.debug('inisde dsiable weekends');
        if (v !== null) {
            let date = new Date(v.target.value);
            let day =  date.getDay();
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

    get diagnostic() { return JSON.stringify(this.refillRequest); }
}
