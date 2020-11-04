import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import en from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        IconsProviderModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
    ],
  providers: [
    CookieService,
    { provide: NZ_I18N, useValue: en_US }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
