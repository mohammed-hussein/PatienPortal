export const SessionState: ISessionState = {
    Countdown: 0,
    SessionTime: 0, // in seconds
    TimeOutValue: 0, // in seconds 
    IsActive: false
};

export interface ISessionState {
    Countdown: number;
    SessionTime: number;
    TimeOutValue: number;
    IsActive: boolean;
}
