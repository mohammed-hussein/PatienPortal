import { Component, OnInit } from '@angular/core';

import {Radiology, MedicalFunctionsService} from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';

@Component({
    moduleId: module.id,
    selector: 'patient-radiologies',
    templateUrl: './radiologies.component.html'
})
export class RadiologiesComponent implements OnInit {
    Radiologies: Radiology[];

    constructor(private RadiologyService: MedicalFunctionsService, private _Logger: LoggerService) { }

    ngOnInit() {
        this.GetRadiologies();
     }

    GetRadiologies() {
        let Startdate  = new Date();
        this._Logger.debug('Start loaded in : ' + Startdate.getTime());
        this.RadiologyService.getRadiologies().then(data => this.Radiologies = data)
                                        .then(() => this._Logger.info(this.Radiologies))
                                        .then(() => this._Logger.debug('End loaded in : ' + new Date().getTime()))
                                        .then(() => this._Logger.debug('End loaded in : ' + ((new Date().getTime() - Startdate.getTime()) / 1000)))
                                        .catch(() => this._Logger.Error('Erro found'));
    }
}
