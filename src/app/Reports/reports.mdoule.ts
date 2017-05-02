import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../Shared/shared.module';
import { SharedComponentModule } from '../SharedComponents/shared-components.module';

import {ReportsContainerComponent, ReportsListComponent, ReportDetailsComponent,
        RadiologyReportsContainerComponent, RadiologyReportsListComponent, RadiologyReportDetailsComponent
        } from './index';
import {ReportsRoutingModule} from './reports.routing';

@NgModule({
    imports: [SharedModule, ReportsRoutingModule, SharedComponentModule],
    exports: [],
    declarations: [ReportsContainerComponent, ReportsListComponent, ReportDetailsComponent,
                    RadiologyReportsContainerComponent, RadiologyReportsListComponent, RadiologyReportDetailsComponent,
                    ],
})

export class ReportsModule {}
