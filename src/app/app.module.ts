import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { RequestComponent } from './request/request.component';
import { AccordionModule, AlertModule, BadgeModule, ButtonModule, FormModule, GridModule, ModalModule, SharedModule, SidebarModule, TableModule, ToastModule, UtilitiesModule } from '@coreui/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconModule } from '@coreui/icons-angular';
import { OfferComponent } from './offers';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        AccordionModule,
        SharedModule,
        BrowserAnimationsModule,
        TableModule,
        BadgeModule,
        SidebarModule,
        GridModule,
        UtilitiesModule,
        ModalModule,
        ButtonModule,
        FormModule,
        ToastModule,
        IconModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        AdminComponent,
        RequestComponent,
        OfferComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };