import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import {RefillRequest} from '../../Services/Refill/request.model';
import {RefillService} from '../../Services/Refill/refill.service';
import { LoggerService } from '../../SharedServices/index';

@Component({
    moduleId: module.id,
    selector: 'refill-details',
    templateUrl: 'refill-details.component.html'
})
export class RefillDetailsComponent implements OnInit {
    request: RefillRequest;

    constructor(private route: ActivatedRoute, private _RefillService: RefillService,
                private router: Router, private _Logger: LoggerService, private translate: TranslateService) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.getRefill();
        });
    }

    getRefill() {
        this.request = new RefillRequest();
        this._Logger.info(this._RefillService.selectedRequest);
        if (this._RefillService.selectedRequest) {
            this.request = this._RefillService.selectedRequest;
        }else {
            this.router.navigate(['RefillRequests']);
        }
    }
}
