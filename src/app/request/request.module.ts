import { NgModule } from '@angular/core';
import { AccordionModule, SharedModule } from '@coreui/angular';
import { RequestComponent } from './request.component';

@NgModule({
  imports: [
    AccordionModule,
    SharedModule
  ]
})
export class RequestModule {}