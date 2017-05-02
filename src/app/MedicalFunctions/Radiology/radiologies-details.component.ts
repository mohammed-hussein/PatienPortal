import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { Radiology, MedicalFunctionsService } from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';

@Component({
    moduleId: module.id,
    selector: 'radiolog-details',
    templateUrl: 'radiologies-details.component.html'
})
export class RadiologiesDetailsComponent implements OnInit {
    radiology: Radiology;

    constructor(private route: ActivatedRoute, private _RadiologyService: MedicalFunctionsService,
                private router: Router, private _Logger: LoggerService, private translate: TranslateService) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.GetRadiologies();
        });
    }

    GetRadiologies() {
        this.radiology = new Radiology();
        this._Logger.info(this._RadiologyService.selectedRadiology);
        if (this._RadiologyService.selectedRadiology) {
            this.radiology = this._RadiologyService.selectedRadiology;
        }else {
            this.router.navigate(['Radiologies']);
        }
    }
}
