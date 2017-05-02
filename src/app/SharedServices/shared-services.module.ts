import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        HttpModule,
    ],
    exports: [
        HttpModule, BrowserModule, FormsModule, ReactiveFormsModule, RouterModule
    ],
})

export class SharedServicesModule { }
