import { ErrorHandler } from '@angular/core';

export class CustomErrorHandler implements ErrorHandler {
  handleError(error: any) {
    // do something with the exception
    console.group('Error Handling Service');
    console.error(error);
    console.error(error.message);
    console.error(error.stack);
    console.groupEnd();
  }
}
