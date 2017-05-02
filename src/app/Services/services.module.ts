import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

@NgModule({
    imports: [
                HttpModule,
            ],
    exports: [
                HttpModule,
            ],
})

export class ServicesModule {}
