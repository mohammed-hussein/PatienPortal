import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SharedModule } from '../Shared/shared.module';
import { SharedComponentModule } from '../SharedComponents/shared-components.module';

import {AddRefillRequestComponent, RefillContainerComponent, RefillRequestsListComponent,
        AddRefillComponent, RefillDetailsComponent} from './index';

import {SpMenucomponent} from './spmenu.component';
import {RefillRoutingModule} from './refill.routing';

@NgModule({
    imports: [SharedModule, ReactiveFormsModule, RefillRoutingModule, SharedComponentModule],
    exports: [SpMenucomponent],
    declarations: [AddRefillRequestComponent, RefillContainerComponent, RefillRequestsListComponent,
                    RefillDetailsComponent, AddRefillComponent,
                    SpMenucomponent],
})

export class RefillModule { }
