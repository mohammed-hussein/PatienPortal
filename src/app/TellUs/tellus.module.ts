import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {
        FeedbackContainerComponent, FeedbacklistComponent, FeedbackDetailsComponent,
        AddFeadbackComponent
} from './index';

import { SharedModule } from '../Shared/shared.module';
import { SharedComponentModule } from '../SharedComponents/shared-components.module';

import { SpMenucomponent } from './spmenu.component';
import { TellusRoutingModule } from './tellus.routing';

@NgModule({
        imports: [SharedModule, TellusRoutingModule, SharedComponentModule],
        exports: [BrowserModule, SpMenucomponent, AddFeadbackComponent],
        declarations: [FeedbackContainerComponent, FeedbacklistComponent, FeedbackDetailsComponent
                        , AddFeadbackComponent, SpMenucomponent]
})

export class TellUsModule { }
