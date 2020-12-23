/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import {CookieService} from 'ngx-cookie-service';
import {NgcCookieConsentConfig, NgcCookieConsentModule} from 'ngx-cookieconsent';
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import en from '@angular/common/locales/en';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IconsProviderModule} from './icons-provider.module';

import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {environment} from '../environments/environment';
import {ServiceWorkerModule} from '@angular/service-worker';

registerLocaleData(en);

// CookieConsent configuration
const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: environment.cookieConsentUrl
  },
  palette: {
    popup: {
      background: 'grey'
    },
    button: {
      background: '#38C6BC'
    }
  },
  theme: 'edgeless',
  type: 'info'
};

@NgModule({
  declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        IconsProviderModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NzNotificationModule,
        NgcCookieConsentModule.forRoot(cookieConfig),
        ServiceWorkerModule.register('ngsw-worker.js'/*, { enabled: environment.production }*/)
    ],
  providers: [
    CookieService,
    { provide: NZ_I18N, useValue: en_US }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
