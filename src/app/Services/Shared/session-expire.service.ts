import { Injectable, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { SessionState } from './session-state.model';
import { AppConstant } from '../const.model';
import { LoggerService } from '../../SharedServices/index';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';


@Injectable()
export class SessionExpireService implements OnInit, OnDestroy {

    private timeoutHandle: any;
    private timeoutHandler: any;
    private state = SessionState;

    public onSessionStart: EventEmitter<number>;
    public onTimeoutWarning: EventEmitter<number>;
    public onSessionTimeout: EventEmitter<number>;
    public onIdleEnd: EventEmitter<number>;

    private idleEndsubscribtion: any;
    private idleStartsubscribtion: any;
    private warningsubscribtion: any;
    private timeoutsubscribtion: any;

    [key: string]: any;

    constructor(private _Logger: LoggerService, private idle: Idle) {
        // console.assert(true, 'initate Session service');
        this.onSessionStart = new EventEmitter<number>();
        this.onTimeoutWarning = new EventEmitter<number>();
        this.onSessionTimeout = new EventEmitter<number>();
        this.onIdleEnd = new EventEmitter<number>();

        this.idleEndsubscribtion = idle.onIdleEnd.subscribe(() => {
            _Logger.info('No longer idle.');
            this.onIdleEnd.emit(null);

        });

        this.idleStartsubscribtion = idle.onIdleStart.subscribe(() => _Logger.info('You\'ve gone idle!'));

        this.timeoutsubscribtion = idle.onTimeout.subscribe(() => {
            _Logger.Warning('Timed out!');
            this.state.IsActive = false;
            this.onSessionTimeout.emit(null);
        });

        this.warningsubscribtion = idle.onTimeoutWarning.subscribe((countdown) => {
            _Logger.Warning('You will time out in ' + countdown + ' seconds!');
            this.onTimeoutWarning.emit(countdown);
        });

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
        /**
         this.setSessionTime(AppConstant.Session_Time);
         this.setTimeout(AppConstant.Session_Expire_Warning);
         this.state.IsActive = true;
         this.onSessionStart.emit(null);

         this.watch();
         */

        // Ng-Idle
        // sets an idle timeout of 5 seconds, for testing purposes.
        this.idle.setIdle(AppConstant.Session_Time);
        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        this.idle.setTimeout(AppConstant.Session_Expire_Warning);
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
        this.state.IsActive = true;
        this.onSessionStart.emit(null);
        this.idle.watch();
    }

    stop(): void {
        this._Logger.debug('remove Session time');
        this.state.IsActive = false;
        this.idle.stop();

        /**
        this.state.Countdown = 0;
        this.safeClearInterval(this.timeoutHandle);
        this.safeClearInterval(this.timeoutHandler);
         */
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
    }

    ngOnDestroy() {
        this.idleEndsubscribtion.unsubscribe();
        this.idleStartsubscribtion.unsubscribe();
        this.warningsubscribtion.unsubscribe();
        this.timeoutsubscribtion.timeoutsubscribtion();
    }
}
