import {Injectable} from '@angular/core';

import {FileInfo} from './fileinfo.model';

import {AuthHttp} from '../Auth/authHttp.service';
import {AppConstant} from '../const.model';
import { LoggerService } from '../../SharedServices/index';

@Injectable()
export class ROIService {

    private ROIServiceURL: string = AppConstant.APP_URL + 'api/ROI' ;
    private ROIFileServiceURL: string = AppConstant.APP_URL + 'api/ROI/File' ;

    // public selectedROIFile: FileInfo;

    constructor(private _HTTP: AuthHttp, private _Logger: LoggerService) {}

    getMedicalReportsSummary(): Promise<FileInfo[]> {
        return this._HTTP.get(this.ROIServiceURL)
                            .toPromise()
                            .then(response => response.json() as FileInfo[])
                            .catch(this._Logger.handleError);
    }

    getReportFile(fileid: string): Promise<string[]> {
        return this._HTTP.get(this.ROIFileServiceURL + '?id=' + fileid)
                            .toPromise()
                            .then(response => response.json() as string[])
                            .catch(this._Logger.handleError);
    }
    // Handle errors
    // private handleError(error: any): Promise<any> {
    //     console.error('An error occurred', error); // for demo purposes only
    //     return Promise.reject(error.message || error);
    // }

}
