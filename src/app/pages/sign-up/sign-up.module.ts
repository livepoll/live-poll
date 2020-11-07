import { NgModule } from '@angular/core';
import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ReactiveFormsModule } from '@angular/forms';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';

@NgModule({
  imports: [
    SignUpRoutingModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzCheckboxModule
  ],
  declarations: [SignUpComponent],
  exports: [SignUpComponent]
})
export class SignUpModule { }
