import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup

// import { AppComponent } from './app.component';
import { NewDesignComponent } from './newDesign.component';


import { AppRoutingModule } from './app.routing';
// import { SpMenucomponent } from './spmenu.component';

import { TellUsModule } from './TellUs/tellus.module';
import { RefillModule } from './Refill/refill.module';
import { ROIModule } from './ROI/roi.module';
import { AuthMdodule } from './Auth/auth.module';
import { MedicalFunctionModule } from './MedicalFunctions/medical-function.module';
import { ReportsModule } from './Reports/index';

import { ServicesModule } from './Services/services.module';
import { TellusService } from './Services/tellus.service';
import { RefillService } from './Services/Refill/refill.service';
import { ROIService } from './Services/ROI/roi.service';
import { AuthService } from './Services/Auth/auth.service';
import { AuthManagerService } from './Services/Auth/auth-manger.service';
import { AuthHttp } from './Services/Auth/authHttp.service';

import { SharedServicesModule } from './SharedServices/shared-services.module';
import { LoggerService, CustomErrorHandler, LoadingService } from './SharedServices/index';
// import { SessionExpireService } from './SharedServices/Session/session-expire.service';
// import {  SessionHandlerService  } from './SharedServices/Session/sessionhandler.service';

import { SessionExpireService, ProfileService, MedicalFunctionsService, ReportsService } from './Services/index';
import { SessionHandlerService } from './Services/Shared/sessionhandler.service';

import { SharedComponentModule } from './SharedComponents/shared-components.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BrowserModule,
    SharedServicesModule,
    TellUsModule,
    RefillModule,
    ROIModule,
    AuthMdodule,
    ServicesModule,
    AppRoutingModule,
    MedicalFunctionModule,
    ReportsModule,
    SharedComponentModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    NgIdleKeepaliveModule.forRoot()
  ],
  providers: [TellusService,
    RefillService,
    ROIService,
    AuthService,
    AuthManagerService,
    AuthHttp,
    SessionExpireService,
    ProfileService,
    MedicalFunctionsService,
    ReportsService,
    LoggerService,
    SessionHandlerService,
    LoadingService,
    // ExpireSessionService,
    // SessionExpireService,
    // {provide: ErrorHandler, useClass: CustomErrorHandler},
  ],
  declarations: [NewDesignComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [NewDesignComponent]
})

export class AppModule { }

