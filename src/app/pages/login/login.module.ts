import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import {LogInRoutingModule} from './login-routing.module';

@NgModule({
  imports: [
    LogInRoutingModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }
