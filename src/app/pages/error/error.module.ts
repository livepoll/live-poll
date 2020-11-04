import { NgModule } from '@angular/core';
import { ErrorComponent } from './error.component';
import {ErrorRoutingModule} from './error-routing.module';

@NgModule({
  imports: [
    ErrorRoutingModule
  ],
  declarations: [ErrorComponent],
  exports: [ErrorComponent]
})
export class ErrorModule { }
