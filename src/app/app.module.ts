import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToasterModule } from 'angular2-toaster';

import { AppComponent } from './app.component';
import { HeaderComponent } from './_reusable/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { IDVerificationComponent } from './id-verification/id-verification.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { HomeComponent } from './home/home.component';
import { CaptureDetailsComponent } from './capture-details/capture-details.component';
import { OtpComponent } from './otp/otp.component';
import { LoanPageComponent } from './loan-page/loan-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IDVerificationComponent,
    CreateAccountComponent,
    ViewDetailsComponent,
    HomeComponent,
    CaptureDetailsComponent,
    OtpComponent,
    LoanPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
