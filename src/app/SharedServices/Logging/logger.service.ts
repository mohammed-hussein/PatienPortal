import { Injectable } from '@angular/core';

import { AppConstant } from '../../Services/index';

@Injectable()
export class LoggerService {
    constructor() { }

    info(message: any, ...optionalParams: any[]) {
        if (!AppConstant.PROD_MODE) {
            if (optionalParams.length > 0) {
                console.log(message, optionalParams);
            } else {
                console.log(message);
            }
        }
    }

    debug(message?: string, ...optionalParams: any[]) {
        if (!AppConstant.PROD_MODE) {
            if (optionalParams.length > 0) {
                console.log(message, optionalParams);
            } else {
                console.log(message);
            }
        }
    }

    Warning(warning: any) {
        console.warn(warning);
    }

    Error(message?: any, ...optionalParams: any[]) {
        if (!AppConstant.PROD_MODE) {
            if (optionalParams.length > 0) {
                console.error(message, optionalParams);
            } else {
                console.error(message);
            }
        }
    }

    handleError(err: any): Promise<any> {
        console.error('An error occurred', err);
        return Promise.reject(err.message || err);
    }

}
