import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../Shared/shared.module';
import { SharedComponentModule } from '../SharedComponents/shared-components.module';

import {ROIContainerComponent, ROIListComponent, ROIDetailsComponent} from './index';
import {ROIRoutingModule} from './roi.routing';
import {SpMenucomponent} from './spmenu.component';

@NgModule({
    imports: [SharedModule, ROIRoutingModule, SharedComponentModule],
    exports: [SpMenucomponent],
    declarations: [ROIContainerComponent, ROIListComponent, ROIDetailsComponent
                    , SpMenucomponent],
})

export class ROIModule {}
