import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';


import { LoggerService } from '../index';

@Injectable()
export class LoadingService {

    private startSource = new Subject<boolean>();
    public onStart = this.startSource.asObservable();

    private doneSource = new Subject<boolean>();
    public onDone = this.doneSource.asObservable();

    public isLoading: boolean;

    constructor(private _Logger: LoggerService) { }

    start() {
        this._Logger.info('Loading service: start ');
        this.isLoading = true;
        this.startSource.next(true);
    }

    done() {
        this._Logger.info('Loading service: Done ');
        this.isLoading = false;
        this.doneSource.next(true);
    }
}
