import { Injectable, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { SessionState } from './session-state.model';
import { AppConstant } from '../const.model';
import { LoggerService } from '../../SharedServices/index';

@Injectable()
export class SessionExpireService implements OnInit, OnDestroy {

    private timeoutHandle: any;
    private timeoutHandler: any;
    private state = SessionState;

    public onSessionStart: EventEmitter<number>;
    public onTimeoutWarning: EventEmitter<number>;
    public onSessionTimeout: EventEmitter<number>;
    [key: string]: any;

    constructor(private _Logger: LoggerService) {
        // console.assert(true, 'initate Session service');
        this.onSessionStart = new EventEmitter<number>();
        this.onTimeoutWarning = new EventEmitter<number>();
        this.onSessionTimeout = new EventEmitter<number>();
    }

    ngOnInit() {
    }

    private getTimeout(): number {
        return this.state.TimeOutValue;
    }

    private setTimeout(value: number) {
        return this.state.TimeOutValue = value;
    }

    getSessionTime(): number {
        return this.state.SessionTime;
    }

    private setSessionTime(value: number) {
        return this.state.SessionTime = value;
    }

    isRunning(): boolean {
        return this.state.IsActive;
    }

    /** Public Methods */

    /*
   * Starts watching for inactivity.
   */

    start(): void {
        this._Logger.debug('Session valid for: ' + AppConstant.Session_Time);
        this.setSessionTime(AppConstant.Session_Time);
        this.setTimeout(AppConstant.Session_Expire_Warning);
        this.state.IsActive = true;
        this.onSessionStart.emit(null);

        this.watch();
    }

    stop(): void {
        this._Logger.debug('remove Session time');
        this.state.IsActive = false;
        this.state.Countdown = 0;
        this.safeClearInterval(this.timeoutHandle);
        this.safeClearInterval(this.timeoutHandler);
    }

    /** Private Methods */

    private watch(): void {
        this.safeClearInterval(this.timeoutHandle);
        this.safeClearInterval(this.timeoutHandler);

        if (!this.state.IsActive) {
            this.toggleState();
        } else {
            this.timeoutHandler = setTimeout(() => {
                this.toggleState();
            }, this.state.SessionTime * 1000);
        }
    }

    private toggleState(): void {

        if (this.state.IsActive) {
            if (this.state.TimeOutValue > 0) {
                this.state.Countdown = this.state.TimeOutValue;
                this.doCountdown();
                this.timeoutHandle = setInterval(() => {
                    this.doCountdown();
                }, 1000);
            }
        } else {
            this.onSessionTimeout.emit(null);
        }
    }

    private doCountdown(): void {
        this._Logger.debug(this.state.Countdown.toString());
        if (!this.state.IsActive) {
            return;
        }

        if (this.state.Countdown <= 0) {
            this.timeout();
            return;
        }

        this.onTimeoutWarning.emit(this.state.Countdown);
        this.state.Countdown--;
    }

    timeout(): void {
        this.safeClearInterval(this.timeoutHandle);

        this.state.IsActive = false;
        this.state.Countdown = 0;

        this.onSessionTimeout.emit(null);
    }

    private safeClearInterval(handleName: any): void {
        if (handleName) {
            clearInterval(handleName);
        }
        // if (this[handleName]) {
        //     clearInterval(this[handleName]);
        //     this[handleName] = null;
        // }
    }

    ngOnDestroy() {
        // this.onSessionStart.closed;
    }

}
