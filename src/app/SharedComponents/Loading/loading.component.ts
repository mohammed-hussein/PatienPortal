import { Component, OnInit, OnDestroy } from '@angular/core';

import { LoggerService, LoadingService } from '../../SharedServices/index';

@Component({
    moduleId: module.id,
    selector: 'app-Loading',
    templateUrl: 'loading.component.html',
    styleUrls: ['loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {
    private startSubscribtion: any;
    private doneSubscribtion: any;
    showLoading: boolean = true;

    constructor(private _Logger: LoggerService, private _Loading: LoadingService) { }

    ngOnInit() {
        this.startSubscribtion = this._Loading.onStart.subscribe((res: boolean) => this.onStart(res));
        this.doneSubscribtion = this._Loading.onDone.subscribe((res: boolean) => this.onDone(res));
    }

    onStart(res: boolean) {
        this._Logger.info('Loading Component: Started = ' + res);
        this.showLoading = true;
    }

    onDone(res: boolean) {
        this._Logger.info('Loading Component: Done = ' + res);
        this.showLoading = false;
    }

    ngOnDestroy() {
        this._Logger.info('Loading Component destory');
        this.startSubscribtion.unsubscribe();
        this.doneSubscribtion.unsubscribe();
    }
}
