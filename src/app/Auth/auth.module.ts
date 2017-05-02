import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

// import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../Shared/shared.module';
import { SharedComponentModule } from '../SharedComponents/shared-components.module';

// import {LoginComponent} from './login.component';
// import {ActivationCodeComponent} from './activation-code.component';
// import {SessionTimeoutComponent} from './session-timeout.component';
// import {LogoutComponent} from './logout.component';
// import {ProfileComponent} from './Profile/profile.component';

import {SpMenucomponent} from './spmenu.component';
import {LoginComponent, ActivationCodeComponent, ProfileComponent, SessionTimeoutComponent} from './index';


@NgModule({
    imports: [SharedModule, SharedComponentModule],
    exports: [LoginComponent, ActivationCodeComponent, SpMenucomponent, SessionTimeoutComponent, ProfileComponent],
    declarations: [LoginComponent, ActivationCodeComponent, SpMenucomponent, SessionTimeoutComponent, ProfileComponent],
})

export class AuthMdodule {}


