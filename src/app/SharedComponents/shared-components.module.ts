import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../Shared/shared.module';

import { MenuComponent, HeaderComponent, LoadingComponent, LogoutComponent }   from './index';
// import {TellUsModule} from '../TellUs/tellus.module';

@NgModule({
    imports: [CommonModule, SharedModule],
    exports: [MenuComponent, HeaderComponent, LoadingComponent, LogoutComponent],
    declarations: [MenuComponent, HeaderComponent, LoadingComponent, LogoutComponent]
})
export class SharedComponentModule { }
