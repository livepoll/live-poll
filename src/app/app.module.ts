import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './_pages/main/main.component';
import { SignInComponent } from './_pages/sign-in/sign-in.component';
import { SignUpComponent } from './_pages/sign-up/sign-up.component';
import { SignSurveyComponent } from './_pages/sign-survey/sign-survey.component';
import { ToolbarComponent } from './_component/toolbar/toolbar.component';
import { ButtonComponent } from './_component/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SignInComponent,
    SignUpComponent,
    SignSurveyComponent,
    ToolbarComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
