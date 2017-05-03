import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { RefillRequest } from '../../Services/Refill/request.model';
import { RefillService } from '../../Services/Refill/refill.service';
import { LoggerService } from '../../SharedServices/index';

@Component({
    moduleId: module.id,
    selector: 'Refill-list',
    templateUrl: './refill-requests-list.component.html'
})

export class RefillRequestsListComponent implements OnInit {
    Requests: RefillRequest[];
    selectedRequest: RefillRequest;
    showData: boolean = true;

    constructor(private _refillService: RefillService, private _Logger: LoggerService,
        private router: Router, private route: ActivatedRoute, private translate: TranslateService) { }

    ngOnInit() {
        this.getRefillRequests();
    }

    getRefillRequests(): void {
        this._refillService.getRequests()
            .then(data => {
                this.showData = true;
                this.Requests = data;
                this._Logger.info(this.Requests);
                this.onSelect(this.Requests[0]);
            }).catch(error => this.handleNoData(error));
    }

    onSelect(request: RefillRequest): void {
        this.selectedRequest = request;
        this._refillService.selectedRequest = new RefillRequest();
        this._refillService.selectedRequest = request;
        if (request) {
            this.router.navigate(['details', request.ID], { relativeTo: this.route });
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

    openAdd() {
        const element = document.getElementById('id_Addrefill');
        element.style.display = 'block';
    }
}
