import { NgModule } from '@angular/core';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';

@NgModule({
  imports: [AnalyticsRoutingModule],
  declarations: [AnalyticsComponent],
  exports: [AnalyticsComponent]
})
export class AnalyticsModule { }
