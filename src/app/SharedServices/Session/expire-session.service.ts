import { Injectable, OnInit, OnDestroy } from '@angular/core';


@Injectable()
export class ExpireSessionService implements OnInit, OnDestroy {

    constructor() {}

    ngOnInit() {
    }

    ngOnDestroy() {
        // this.onSessionStart.closed;
    }

}
