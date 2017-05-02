import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [],
    exports: [BrowserModule, FormsModule, RouterModule, TranslateModule],
    providers: [],
})
export class SharedModule { }
